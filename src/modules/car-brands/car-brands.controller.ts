import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateCarBrandReqDto } from './models/dto/req/create-car-brand.req.dto';
import { UpdateCarBrandReqDto } from './models/dto/req/update-car-brand.req.dto';
import { CarBrandService } from './services/car-brands.service';

@ApiTags('Бренды автомобилей')
@Controller('car-brands')
export class CarBrandController {
  constructor(private readonly carBrandService: CarBrandService) {}

  @ApiOperation({
    summary: 'Создание нового бренда автомобиля',
    description: 'Создание нового бренда автомобиля в базе данных',
  })
  @Post()
  create(@Body() createCarBrandDto: CreateCarBrandReqDto) {
    return this.carBrandService.create(createCarBrandDto);
  }

  @ApiOperation({
    summary: 'Получение списка всех брендов автомобилей',
    description: 'Получение списка всех брендов автомобилей из базы данных',
  })
  @Get()
  findAll() {
    return this.carBrandService.findAll();
  }

  @ApiOperation({
    summary: 'Получение информации о конкретном бренде автомобиля',
    description:
      'Получение информации о конкретном бренде автомобиля из базы данных',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carBrandService.findOne(id);
  }

  @ApiOperation({
    summary: 'Обновление информации о конкретном бренде автомобиля',
    description:
      'Обновление информации о конкретном бренде автомобиля в базе данных',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCarBrandDto: UpdateCarBrandReqDto,
  ) {
    return this.carBrandService.update(id, updateCarBrandDto);
  }

  @ApiOperation({
    summary: 'Удаление конкретного бренда автомобиля',
    description: 'Удаление конкретного бренда автомобиля из базы данных',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carBrandService.remove(id);
  }
}
