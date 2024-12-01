// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';

// import { Listing } from '../../database/entities/listing.entity';
// import { ExchangeRateModule } from '../exchange-rate/exchange-rate.module';
// import { ProfanityFilterModule } from '../profanity-filter/profanity-filter.module';
// import { ListingsController } from './listings.controller';
// import { ListingsService } from './services/listings.service';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([Listing]),
//     ProfanityFilterModule,
//     ExchangeRateModule, // Добавьте сюда
//   ],
//   controllers: [ListingsController],
//   providers: [ListingsService],
//   exports: [ListingsService],
// })
// export class ListingsModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Listing } from '../../database/entities/listing.entity';
import { ExchangeRateModule } from '../exchange-rate/exchange-rate.module';
import { ProfanityFilterModule } from '../profanity-filter/profanity-filter.module';
import { ListingsController } from './listings.controller';
import { ListingsService } from './services/listings.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Listing]),
    ProfanityFilterModule,
    ExchangeRateModule, // Добавлено в импорт
  ],
  controllers: [ListingsController],
  providers: [ListingsService],
  exports: [ListingsService],
})
export class ListingsModule {}
