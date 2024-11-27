import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateCarModelDto } from './models/dto/req/create-car-model.req.dto';
import { UpdateCarModelDto } from './models/dto/req/update-car-model.req.dto';
import { CarModelsService } from './services/car-models.service';

@Controller('car-models')
export class CarModelsController {
  constructor(private readonly carModelsService: CarModelsService) {}

  @Post()
  create(@Body() createCarModelDto: CreateCarModelDto) {
    return this.carModelsService.create(createCarModelDto);
  }

  @Get()
  findAll() {
    return this.carModelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carModelsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCarModelDto: UpdateCarModelDto,
  ) {
    return this.carModelsService.update(+id, updateCarModelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carModelsService.remove(+id);
  }
}
