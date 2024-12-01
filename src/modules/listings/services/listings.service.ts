// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';

// import { Listing } from '../../../database/entities/listing.entity';
// import { ExchangeRateService } from '../../exchange-rate/services/exchange-rate.service'; // Импортируем сервис для получения курса валют

// @Injectable()
// export class ListingsService {
//   constructor(
//     @InjectRepository(Listing)
//     private listingsRepository: Repository<Listing>,
//     private exchangeRateService: ExchangeRateService, // Инжектим сервис для получения курса валют
//   ) {}

//   // Метод для создания объявления с конвертацией цены
//   async createListing(createListingDto: any): Promise<Listing> {
//     const { price, currency } = createListingDto;

//     // Получаем актуальные курсы для валюты
//     const exchangeRate = await this.exchangeRateService.getLatestRates();

//     // Проверяем, содержит ли объект свойство rates
//     if (!('rates' in exchangeRate)) {
//       throw new Error('Не удалось получить актуальные курсы валют');
//     }

//     // Получаем курс для заданной валюты
//     const rate = exchangeRate.rates[currency];
//     if (!rate) {
//       throw new Error(`Курс для валюты ${currency} не найден`);
//     }

//     // Пересчитываем цену в оригинальной валюте
//     const originalCurrencyRate = exchangeRate.rates['USD'];
//     const priceInOriginalCurrency = price * (rate / originalCurrencyRate);

//     // Создаем объявление
//     const listing = this.listingsRepository.create({
//       price,
//       currency,
//       originalCurrency: currency, // Устанавливаем originalCurrency
//       exchangeRate: rate,
//       status: 'active', // Пример статуса
//       description: 'Description', // Пример описания
//       priceInOriginalCurrency, // Добавляем пересчитанную цену
//     });

//     return await this.listingsRepository.save(listing);
//   }

//   // Метод для получения всех объявлений
//   async getAllListings(): Promise<Listing[]> {
//     return await this.listingsRepository.find();
//   }

//   // Метод для получения одного объявления
//   async getListingById(id: string): Promise<Listing> {
//     return await this.listingsRepository.findOne({ where: { id } });
//   }

//   async updateListingCurrency(id: string): Promise<Listing> {
//     const listing = await this.getListingById(id);
//     if (!listing) {
//       throw new Error('Listing not found');
//     }

//     // Получаем актуальный курс
//     const exchangeRate = await this.exchangeRateService.getLatestRates();

//     // Проверяем, содержит ли объект свойство rates
//     if (!('rates' in exchangeRate)) {
//       throw new Error('Не удалось получить актуальные курсы валют');
//     }

//     // Конвертируем цену в новую валюту
//     const rate = exchangeRate.rates[listing.currency];
//     if (!rate) {
//       throw new Error(`Курс для валюты ${listing.currency} не найден`);
//     }

//     // Пересчитываем цену в валюте
//     const priceInCurrency = listing.price * rate;

//     listing.priceInCurrency = priceInCurrency;
//     listing.exchangeRate = rate;

//     return await this.listingsRepository.save(listing);
//   }
// }

// import { Injectable, Logger } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';

// import { Listing } from '../../../database/entities/listing.entity';
// import { ExchangeRateService } from '../../exchange-rate/services/exchange-rate.service';
// import { CreateListingReqDto } from '../models/dto/req/create-listing.req.dto';

// @Injectable()
// export class ListingsService {
//   private readonly logger = new Logger(ListingsService.name);

//   constructor(
//     @InjectRepository(Listing)
//     private listingsRepository: Repository<Listing>,
//     private exchangeRateService: ExchangeRateService,
//   ) {}

//   async createListing(createListingDto: CreateListingReqDto): Promise<Listing> {
//     this.logger.log('Creating a new listing');

//     const { price, currency, description } = createListingDto;

//     this.logger.log(
//       `Received data - Price: ${price}, Currency: ${currency}, Description: ${description}`,
//     );

//     const exchangeRate = await this.exchangeRateService.getLatestRates();
//     if (!('rates' in exchangeRate)) {
//       this.logger.error('Failed to retrieve the latest exchange rates');
//       throw new Error('Не удалось получить актуальные курсы валют');
//     }

//     const rate = exchangeRate.rates[currency];
//     if (!rate) {
//       this.logger.error(`Exchange rate for currency ${currency} not found`);
//       throw new Error(`Курс для валюты ${currency} не найден`);
//     }

//     const originalCurrencyRate = exchangeRate.rates['USD'];
//     const priceInOriginalCurrency = price * (rate / originalCurrencyRate);

//     const listing = this.listingsRepository.create({
//       price,
//       currency,
//       originalCurrency: 'USD',
//       exchangeRate: rate,
//       status: 'active',
//       description,
//       priceInOriginalCurrency,
//     });

//     const savedListing = await this.listingsRepository.save(listing);
//     this.logger.log(`Listing created with ID: ${savedListing.id}`);

//     return savedListing;
//   }

//   async getAllListings(): Promise<Listing[]> {
//     this.logger.log('Retrieving all listings');
//     return await this.listingsRepository.find();
//   }

//   async getListingById(id: string): Promise<Listing> {
//     this.logger.log(`Retrieving listing with ID: ${id}`);
//     return await this.listingsRepository.findOne({ where: { id } });
//   }

//   async updateListingCurrency(id: string): Promise<Listing> {
//     this.logger.log(`Updating currency for listing with ID: ${id}`);

//     const listing = await this.getListingById(id);
//     if (!listing) {
//       this.logger.error('Listing not found');
//       throw new Error('Listing not found');
//     }

//     const exchangeRate = await this.exchangeRateService.getLatestRates();
//     if (!('rates' in exchangeRate)) {
//       this.logger.error('Failed to retrieve the latest exchange rates');
//       throw new Error('Не удалось получить актуальные курсы валют');
//     }

//     const rate = exchangeRate.rates[listing.currency];
//     if (!rate) {
//       this.logger.error(
//         `Exchange rate for currency ${listing.currency} not found`,
//       );
//       throw new Error(`Курс для валюты ${listing.currency} не найден`);
//     }

//     const priceInCurrency = listing.price * rate;
//     listing.priceInCurrency = priceInCurrency;
//     listing.exchangeRate = rate;

//     const updatedListing = await this.listingsRepository.save(listing);
//     this.logger.log(`Listing with ID: ${id} updated successfully`);

//     return updatedListing;
//   }
// }

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Listing } from '../../../database/entities/listing.entity';
import { ExchangeRateService } from '../../exchange-rate/services/exchange-rate.service';
import { CreateListingReqDto } from '../models/dto/req/create-listing.req.dto';

@Injectable()
export class ListingsService {
  private readonly logger = new Logger(ListingsService.name);

  constructor(
    @InjectRepository(Listing)
    private listingsRepository: Repository<Listing>,
    private exchangeRateService: ExchangeRateService,
  ) {}

  // Обновленный метод createListing с учетом передачи userId
  async createListing(
    createListingDto: CreateListingReqDto,
    userId: string, // Параметр userId теперь строки
  ): Promise<Listing> {
    this.logger.log('Creating a new listing');

    const { price, currency, description, brandId, modelId } = createListingDto;

    this.logger.log(
      `Received data - Price: ${price}, Currency: ${currency}, Description: ${description}, BrandId: ${brandId}, ModelId: ${modelId}`,
    );

    // Получаем актуальные курсы валют
    const exchangeRate = await this.exchangeRateService.getLatestRates();
    if (!('rates' in exchangeRate)) {
      this.logger.error('Failed to retrieve the latest exchange rates');
      throw new Error('Не удалось получить актуальные курсы валют');
    }

    const rate = exchangeRate.rates[currency];
    if (!rate) {
      this.logger.error(`Exchange rate for currency ${currency} not found`);
      throw new Error(`Курс для валюты ${currency} не найден`);
    }

    const originalCurrencyRate = exchangeRate.rates['USD'];
    const priceInOriginalCurrency = price * (rate / originalCurrencyRate);

    // Создаем объявление с обязательным userId
    const listing = this.listingsRepository.create({
      price,
      currency,
      originalCurrency: 'USD',
      exchangeRate: rate,
      status: 'active',
      description,
      priceInOriginalCurrency,
      brandId, // Добавляем brandId и modelId
      modelId,
      userId, // Передаем userId
    });

    const savedListing = await this.listingsRepository.save(listing);
    this.logger.log(`Listing created with ID: ${savedListing.id}`);

    return savedListing;
  }

  // Метод для получения всех объявлений
  async getAllListings(): Promise<Listing[]> {
    this.logger.log('Retrieving all listings');
    return await this.listingsRepository.find();
  }

  // Метод для получения объявления по ID
  async getListingById(id: string): Promise<Listing> {
    this.logger.log(`Retrieving listing with ID: ${id}`);
    return await this.listingsRepository.findOne({ where: { id } });
  }

  // Метод для обновления валюты в объявлении
  async updateListingCurrency(id: string): Promise<Listing> {
    this.logger.log(`Updating currency for listing with ID: ${id}`);

    const listing = await this.getListingById(id);
    if (!listing) {
      this.logger.error('Listing not found');
      throw new Error('Listing not found');
    }

    const exchangeRate = await this.exchangeRateService.getLatestRates();
    if (!('rates' in exchangeRate)) {
      this.logger.error('Failed to retrieve the latest exchange rates');
      throw new Error('Не удалось получить актуальные курсы валют');
    }

    const rate = exchangeRate.rates[listing.currency];
    if (!rate) {
      this.logger.error(
        `Exchange rate for currency ${listing.currency} not found`,
      );
      throw new Error(`Курс для валюты ${listing.currency} не найден`);
    }

    const priceInCurrency = listing.price * rate;
    listing.priceInCurrency = priceInCurrency;
    listing.exchangeRate = rate;

    const updatedListing = await this.listingsRepository.save(listing);
    this.logger.log(`Listing with ID: ${id} updated successfully`);

    return updatedListing;
  }
}
