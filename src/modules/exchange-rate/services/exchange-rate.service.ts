// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { Cron, CronExpression } from '@nestjs/schedule';
// import { InjectRepository } from '@nestjs/typeorm';
// import axios from 'axios';
// import { Repository } from 'typeorm';

// import { ExchangeRate } from '../../../database/entities/exchange-rate.entity';

// @Injectable()
// export class ExchangeRateService {
//   private readonly API_URL = this.configService.get<string>(
//     'exchangeRate.apiUrl',
//   );
//   private readonly API_KEY = this.configService.get<string>(
//     'exchangeRate.apiKey',
//   );

//   constructor(
//     @InjectRepository(ExchangeRate)
//     private exchangeRateRepository: Repository<ExchangeRate>,
//     private configService: ConfigService,
//   ) {}

//   async onModuleInit() {
//     const existing = await this.exchangeRateRepository.findOne({
//       where: { currency: 'USD' },
//     });
//     if (!existing) {
//       await this.exchangeRateRepository.save({
//         currency: 'USD',
//         rates: {},
//         updatedAt: new Date(),
//       });
//       console.log('Инициализирована первая запись в таблице exchange_rate');
//     }
//   }

//   async getLatestRates() {
//     const latest = await this.exchangeRateRepository.findOne({
//       order: { updatedAt: 'DESC' },
//     });

//     if (!latest) {
//       console.log('Данные в таблице отсутствуют');
//       return { message: 'Курсы валют ещё не загружены' };
//     }

//     return latest;
//   }

//   @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
//   async updateExchangeRate() {
//     try {
//       const response = await axios.get(
//         `${this.API_URL}/${this.API_KEY}/latest/USD`,
//       );
//       const rates = response.data.rates;

//       const existing = await this.exchangeRateRepository.findOne({
//         where: { currency: 'USD' },
//       });

//       if (existing) {
//         existing.rates = rates;
//         existing.updatedAt = new Date();
//         await this.exchangeRateRepository.save(existing);
//       } else {
//         await this.exchangeRateRepository.save({
//           currency: 'USD',
//           rates,
//           updatedAt: new Date(),
//         });
//       }

//       console.log('Курс валют успешно обновлен');
//     } catch (error) {
//       console.error('Ошибка при обновлении курса валют:', error.message);
//     }
//   }
// }

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { In, Repository } from 'typeorm';

import { ExchangeRate } from '../../../database/entities/exchange-rate.entity';

@Injectable()
export class ExchangeRateService {
  private readonly API_URL = this.configService.get<string>(
    'exchangeRate.apiUrl',
  );
  private readonly API_KEY = this.configService.get<string>(
    'exchangeRate.apiKey',
  );
  private readonly CURRENCIES = ['USD', 'EUR', 'UAH']; // Валюты, которые мы отслеживаем

  constructor(
    @InjectRepository(ExchangeRate)
    private exchangeRateRepository: Repository<ExchangeRate>,
    private configService: ConfigService,
  ) {}

  async onModuleInit() {
    for (const currency of this.CURRENCIES) {
      const existing = await this.exchangeRateRepository.findOne({
        where: { currency },
      });
      if (!existing) {
        await this.exchangeRateRepository.save({
          currency,
          rates: {},
          updatedAt: new Date(),
        });
        console.log(`Инициализирована первая запись для ${currency}`);
      }
    }
  }

  async getLatestRates() {
    // const rates = await this.exchangeRateRepository.find({
    //   where: {
    //     currency: In(this.CURRENCIES),
    //   },
    //   order: { updatedAt: 'DESC' },
    // });

    // if (rates.length === 0) {
    //   console.log('Данные в таблице отсутствуют');
    //   return { message: 'Курсы валют ещё не загружены' };
    // }

    // return rates;
    return { rates: { USD: 1, EUR: 0.9, UAH: 28 } };
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async updateExchangeRate() {
    try {
      const response = await axios.get(
        `${this.API_URL}/${this.API_KEY}/latest`,
      );
      const rates = response.data.rates;

      // Удаляем старые записи
      await this.exchangeRateRepository.delete({
        currency: In(this.CURRENCIES),
      });

      // Сохраняем новые данные
      for (const currency of this.CURRENCIES) {
        if (rates[currency]) {
          await this.exchangeRateRepository.save({
            currency,
            rates: rates[currency],
            updatedAt: new Date(),
          });
        }
      }

      console.log('Курс валют успешно обновлен');
    } catch (error) {
      console.error('Ошибка при обновлении курса валют:', error.message);
    }
  }
}
