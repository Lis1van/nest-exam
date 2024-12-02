import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { In, Repository } from 'typeorm';

import { ExchangeRate } from '../../../database/entities/exchange-rate.entity';

@Injectable()
export class ExchangeRateService {
  private readonly API_URL = 'https://api.privatbank.ua/p24api/pubinfo';
  private readonly CURRENCIES = ['USD', 'EUR', 'UAH'];

  constructor(
    @InjectRepository(ExchangeRate)
    private exchangeRateRepository: Repository<ExchangeRate>,
    private configService: ConfigService,
  ) {}

  async onModuleInit() {
    try {
      // Получаем данные с API при инициализации
      const response = await axios.get(
        `${this.API_URL}?json&exchange&coursid=5`,
      );

      const rates = response.data;

      // Подготовка начальных курсов
      const initialRates = {
        USD: 1,
        EUR: 1,
        UAH: 1,
      };

      // Обновление курсов из API, если они есть
      for (const currency of this.CURRENCIES) {
        const rate = rates.find((r) => r.ccy === currency);

        // Проверяем существование записи
        const existingRate = await this.exchangeRateRepository.findOne({
          where: { currency },
        });

        // Обновляем или создаем курс
        if (rate) {
          initialRates[currency] = parseFloat(rate.sale);
        }

        if (existingRate) {
          existingRate.rates = {
            USD: initialRates.USD,
            EUR: initialRates.EUR,
            UAH: initialRates.UAH,
          };
          existingRate.updatedAt = new Date();
          await this.exchangeRateRepository.save(existingRate);
        } else {
          await this.exchangeRateRepository.save({
            currency,
            rates: {
              USD: initialRates.USD,
              EUR: initialRates.EUR,
              UAH: initialRates.UAH,
            },
            updatedAt: new Date(),
          });
        }

        console.log(`Инициализирована запись для ${currency}`);
      }
    } catch (error) {
      console.error('Ошибка при инициализации курсов валют:', error);
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async updateExchangeRate() {
    try {
      const response = await axios.get(
        `${this.API_URL}?json&exchange&coursid=5`,
      );

      const rates = response.data;

      if (!rates || rates.length === 0) {
        throw new Error('Отсутствуют данные о курсах валют');
      }

      const updatedRates = {
        USD: 1,
        EUR: 1,
        UAH: 1,
      };

      // Обновляем курсы из API
      for (const currency of this.CURRENCIES) {
        const rate = rates.find((r) => r.ccy === currency);
        if (rate) {
          updatedRates[currency] = parseFloat(rate.sale);
        }
      }

      // Обновляем все записи одновременно
      await this.exchangeRateRepository.save(
        this.CURRENCIES.map((currency) => ({
          currency,
          rates: updatedRates,
          updatedAt: new Date(),
        })),
      );

      console.log('Курсы валют успешно обновлены');
    } catch (error) {
      console.error('Ошибка при обновлении курса валют:', error);
    }
  }

  async getLatestRates(): Promise<{ rates: Record<string, number> }> {
    console.log('Получение последних тарифов...');
    const rates = await this.exchangeRateRepository.find({
      where: { currency: In(this.CURRENCIES) },
      order: { updatedAt: 'DESC' },
    });

    console.log('Найденные курсы:', JSON.stringify(rates, null, 2));

    if (rates.length === 0) {
      throw new Error('Курсы валют ещё не загружены');
    }

    const ratesMap = rates.reduce((acc, rate) => {
      console.log(`Цена за ${rate.currency}:`, rate.rates[rate.currency]);
      acc[rate.currency] = rate.rates[rate.currency];
      return acc;
    }, {});

    return { rates: ratesMap };
  }
}
