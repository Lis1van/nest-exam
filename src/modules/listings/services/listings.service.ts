import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ListingStatus } from '../../../database/entities/enums/listig-status.enum';
import { Listing } from '../../../database/entities/listing.entity';
import { ExchangeRateService } from '../../exchange-rate/services/exchange-rate.service';
import { MailService } from '../../mailer/services/mailer.service';
import { ProfanityFilterService } from '../../profanity-filter/services/profanity-filter.service';
import { CreateListingReqDto } from '../models/dto/req/create-listing.req.dto';

@Injectable()
export class ListingsService {
  private readonly logger = new Logger(ListingsService.name);

  constructor(
    @InjectRepository(Listing)
    private listingsRepository: Repository<Listing>,
    private exchangeRateService: ExchangeRateService,
    private profanityCheckService: ProfanityFilterService,
    private emailService: MailService,
  ) {}

  async createListing(
    createListingDto: CreateListingReqDto,
    userId: string,
  ): Promise<Listing> {
    try {
      this.logger.log('Создание нового объявления');

      const { price, currency, description, brandId, modelId } =
        createListingDto;

      // Проверка на запрещенные слова
      if (this.profanityCheckService.checkProfanity(description)) {
        this.logger.error('Описание содержит запрещенные слова');
        throw new BadRequestException('Описание содержит запрещенные слова');
      }

      let rates;
      try {
        const ratesResponse = await this.exchangeRateService.getLatestRates();
        rates = ratesResponse.rates;
      } catch (rateError) {
        this.logger.error('Не удалось получить курсы валют', rateError);
        throw new BadRequestException(
          `Не удалось получить курсы валют: ${rateError.message}`,
        );
      }

      const rate = rates[currency];
      if (!rate) {
        this.logger.error(`Курс обмена не найден для валюты : ${currency}`);
        throw new BadRequestException(`Курс для валюты ${currency} не найден`);
      }

      const originalCurrencyRate = rates['USD'];
      const priceInOriginalCurrency = price * (rate / originalCurrencyRate);

      const listing = this.listingsRepository.create({
        price,
        currency,
        originalCurrency: 'USD',
        exchangeRate: rate,
        status: ListingStatus.MODERATION, // Используем enum
        description,
        priceInOriginalCurrency,
        brandId,
        modelId,
        userId,
      });

      let savedListing;
      try {
        savedListing = await this.listingsRepository.save(listing);
      } catch (saveError) {
        this.logger.error('Не удалось сохранить объявление', saveError);
        throw new BadRequestException(
          `Не удалось сохранить объявление: ${saveError.message}`,
        );
      }

      this.logger.log(`Объявление с ID: ${savedListing.id}`);

      // Отправка уведомления о создании объявления
      try {
        await this.emailService.sendStatusChangeEmail(
          userId,
          savedListing.status,
        );
      } catch (emailError) {
        this.logger.error(
          'Не удалось отправить уведомление о создании объявления',
          emailError,
        );
        // Не бросаем исключение, так как создание объявления уже прошло успешно
      }

      return savedListing;
    } catch (error) {
      this.logger.error('Ошибка при создании объявления', error);

      // Более точная обработка различных типов ошибок
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new BadRequestException('Не удалось создать объявление');
    }
  }

  async updateListingStatus(id: string, status: string): Promise<Listing> {
    this.logger.log(`Обновление статуса объявления с ID: ${id}`);

    // Проверяем, что статус корректен
    if (!Object.values(ListingStatus).includes(status as ListingStatus)) {
      throw new BadRequestException(`Неизвестный статус: ${status}`);
    }

    const listing = await this.getListingById(id);

    // Приведение статуса к типу `ListingStatus`
    listing.status = status as ListingStatus;

    const updatedListing = await this.listingsRepository.save(listing);

    this.logger.log(`Объявление с ID: ${id} обновлено статусом: ${status}`);
    return updatedListing;
  }

  async getListingById(id: string): Promise<Listing> {
    const listing = await this.listingsRepository.findOne({ where: { id } });
    if (!listing) {
      throw new Error('Объявление не найдено');
    }
    return listing;
  }
}
