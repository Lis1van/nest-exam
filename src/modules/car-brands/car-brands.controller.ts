import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateCarBrandReqDto } from './models/dto/req/create-car-brand.req.dto';
import { UpdateCarBrandReqDto } from './models/dto/req/update-car-brand.req.dto';
import { CarBrandService } from './services/car-brands.service';

@Controller('car-brands')
export class CarBrandController {
  constructor(private readonly carBrandService: CarBrandService) {}

  @Post()
  create(@Body() createCarBrandDto: CreateCarBrandReqDto) {
    return this.carBrandService.create(createCarBrandDto);
  }

  @Get()
  findAll() {
    return this.carBrandService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carBrandService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCarBrandDto: UpdateCarBrandReqDto,
  ) {
    return this.carBrandService.update(id, updateCarBrandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carBrandService.remove(id);
  }
}
