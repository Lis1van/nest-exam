// import { Module } from '@nestjs/common';

// import { AveragePricesController } from './average-prices.controller';
// import { AveragePricesService } from './services/average-prices.service';

// @Module({
//   controllers: [AveragePricesController],
//   providers: [AveragePricesService],
// })
// export class AveragePricesModule {}

// src/average-price/average-price.module.ts

// average-price.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Listing } from '../../database/entities/listing.entity';
import { AveragePriceController } from './average-prices.controller';
import { AveragePriceService } from './services/average-prices.service';

@Module({
  imports: [TypeOrmModule.forFeature([Listing])],
  providers: [AveragePriceService],
  controllers: [AveragePriceController],
})
export class AveragePriceModule {}
