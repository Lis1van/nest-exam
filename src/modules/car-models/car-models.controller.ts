import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateCarModelReqDto } from './models/dto/req/create-car-model.req.dto';
import { UpdateCarModelReqDto } from './models/dto/req/update-car-model.req.dto';
import { CarModelService } from './services/car-models.service';

@Controller('car-models')
export class CarModelController {
  constructor(private readonly carModelService: CarModelService) {}

  @Post()
  create(@Body() createCarModelDto: CreateCarModelReqDto) {
    return this.carModelService.createCarModel(createCarModelDto);
  }

  @Get()
  findAll() {
    return this.carModelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carModelService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCarModelDto: UpdateCarModelReqDto,
  ) {
    return this.carModelService.update(id, updateCarModelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carModelService.remove(id);
  }
}
