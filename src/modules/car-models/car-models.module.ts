import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarBrand } from 'src/database/entities/car-brand.entity';

import { CarModel } from '../../database/entities/car-model.entity';
import { CarModelController } from './car-models.controller';
import { CarModelService } from './services/car-models.service';

@Module({
  imports: [TypeOrmModule.forFeature([CarModel, CarBrand])],
  controllers: [CarModelController],
  providers: [CarModelService],
  exports: [CarModelService],
})
export class CarModelModule {}
