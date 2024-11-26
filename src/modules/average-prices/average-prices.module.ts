import { Module } from '@nestjs/common';

import { AveragePricesController } from './average-prices.controller';
import { AveragePricesService } from './services/average-prices.service';

@Module({
  controllers: [AveragePricesController],
  providers: [AveragePricesService],
})
export class AveragePricesModule {}
