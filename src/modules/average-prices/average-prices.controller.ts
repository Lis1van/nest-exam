import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateAveragePriceDto } from './models/dto/req/create-average-price.req.dto';
import { UpdateAveragePriceDto } from './models/dto/req/update-average-price.req.dto';
import { AveragePricesService } from './services/average-prices.service';

@Controller('average-prices')
export class AveragePricesController {
  constructor(private readonly averagePricesService: AveragePricesService) {}

  @Post()
  create(@Body() createAveragePriceDto: CreateAveragePriceDto) {
    return this.averagePricesService.create(createAveragePriceDto);
  }

  @Get()
  findAll() {
    return this.averagePricesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.averagePricesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAveragePriceDto: UpdateAveragePriceDto,
  ) {
    return this.averagePricesService.update(+id, updateAveragePriceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.averagePricesService.remove(+id);
  }
}
