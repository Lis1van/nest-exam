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

import { CreateCarModelReqDto } from './models/dto/req/create-car-model.req.dto';
import { UpdateCarModelReqDto } from './models/dto/req/update-car-model.req.dto';
import { CarModelService } from './services/car-models.service';

@ApiTags('Модели авто')
@Controller('car-models')
export class CarModelController {
  constructor(private readonly carModelService: CarModelService) {}

  @ApiOperation({
    summary: 'Создание модели авто',
    description: 'Создание модели авто',
  })
  @Post()
  create(@Body() createCarModelDto: CreateCarModelReqDto) {
    return this.carModelService.createCarModel(createCarModelDto);
  }

  @ApiOperation({
    summary: 'Получение списка моделей авто',
    description: 'Получение списка моделей авто',
  })
  @Get()
  findAll() {
    return this.carModelService.findAll();
  }

  @ApiOperation({
    summary: 'Получение модели авто по id',
    description: 'Получение модели авто по id',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carModelService.findOne(id);
  }

  @ApiOperation({
    summary: 'Обновление модели авто',
    description: 'Обновление модели авто',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCarModelDto: UpdateCarModelReqDto,
  ) {
    return this.carModelService.update(id, updateCarModelDto);
  }

  @ApiOperation({
    summary: 'Удаление модели авто',
    description: 'Удаление модели авто',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carModelService.remove(id);
  }
}
