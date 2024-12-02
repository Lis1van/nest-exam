import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CarBrand } from '../../database/entities/car-brand.entity';
import { CarBrandController } from './car-brands.controller';
import { CarBrandService } from './services/car-brands.service';

@Module({
  imports: [TypeOrmModule.forFeature([CarBrand])],
  controllers: [CarBrandController],
  providers: [CarBrandService],
  exports: [CarBrandService],
})
export class CarBrandModule {}
