import { Module } from '@nestjs/common';

import { CarBrandsController } from './car-brands.controller';
import { CarBrandsService } from './services/car-brands.service';

@Module({
  controllers: [CarBrandsController],
  providers: [CarBrandsService],
})
export class CarBrandsModule {}
