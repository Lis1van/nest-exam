// import { Module } from '@nestjs/common';
// import { ScheduleModule } from '@nestjs/schedule';
// import { TypeOrmModule } from '@nestjs/typeorm';

// import { ExchangeRate } from '../../database/entities/exchange-rate.entity';
// import { ExchangeRateController } from './exchange-rate.controller';
// import { ExchangeRateService } from './services/exchange-rate.service';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([ExchangeRate]),
//     ScheduleModule.forRoot(), // Включаем расписание
//   ],
//   controllers: [ExchangeRateController],
//   providers: [ExchangeRateService],
//   exports: [ExchangeRateService],
// })
// export class ExchangeRateModule {}

import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExchangeRate } from '../../database/entities/exchange-rate.entity';
import { ExchangeRateController } from './exchange-rate.controller';
import { ExchangeRateService } from './services/exchange-rate.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExchangeRate]),
    ScheduleModule.forRoot(), // Включаем расписание
  ],
  controllers: [ExchangeRateController],
  providers: [ExchangeRateService],
  exports: [ExchangeRateService],
})
export class ExchangeRateModule {}
