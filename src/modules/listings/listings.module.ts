import { Module } from '@nestjs/common';

import { ListingsController } from './listings.controller';
import { ListingsService } from './services/listings.service';

@Module({
  controllers: [ListingsController],
  providers: [ListingsService],
})
export class ListingsModule {}
