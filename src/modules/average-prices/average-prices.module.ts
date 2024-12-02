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
