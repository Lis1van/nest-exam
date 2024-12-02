import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';

import { ExchangeRateService } from './services/exchange-rate.service';

@Controller('exchange-rate')
export class ExchangeRateController {
  constructor(private readonly exchangeRateService: ExchangeRateService) {}

  @Get()
  async getExchangeRate() {
    try {
      const latestRates = await this.exchangeRateService.getLatestRates();
      if (!latestRates) {
        throw new HttpException('Курсы валют не найдены', HttpStatus.NOT_FOUND);
      }
      return latestRates;
    } catch (error) {
      console.error('Ошибка при получении курса валют:', error.message);
      throw new HttpException(
        'Ошибка на стороне сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
