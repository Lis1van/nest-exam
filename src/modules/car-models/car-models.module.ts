import { Module } from '@nestjs/common';

import { CarModelsController } from './car-models.controller';
import { CarModelsService } from './services/car-models.service';

@Module({
  controllers: [CarModelsController],
  providers: [CarModelsService],
})
export class CarModelsModule {}
