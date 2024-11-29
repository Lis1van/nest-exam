// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Param,
//   Patch,
//   Post,
// } from '@nestjs/common';

// import { CreateAveragePriceDto } from './models/dto/req/create-average-price.req.dto';
// import { UpdateAveragePriceDto } from './models/dto/req/update-average-price.req.dto';
// import { AveragePricesService } from './services/average-prices.service';

// @Controller('average-prices')
// export class AveragePricesController {
//   constructor(private readonly averagePricesService: AveragePricesService) {}

//   @Post()
//   create(@Body() createAveragePriceDto: CreateAveragePriceDto) {
//     return this.averagePricesService.create(createAveragePriceDto);
//   }

//   @Get()
//   findAll() {
//     return this.averagePricesService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.averagePricesService.findOne(+id);
//   }

//   @Patch(':id')
//   update(
//     @Param('id') id: string,
//     @Body() updateAveragePriceDto: UpdateAveragePriceDto,
//   ) {
//     return this.averagePricesService.update(+id, updateAveragePriceDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.averagePricesService.remove(+id);
//   }
// }

// src/average-price/average-price.controller.ts

// import {
//   Body,
//   Controller,
//   Get,
//   Param,
//   ParseIntPipe,
//   Patch,
//   Query,
// } from '@nestjs/common';
// import { ApiQuery } from '@nestjs/swagger';

// import { GetAveragePriceReqDto } from './models/dto/req/get-average-price.req.dto';
// import { UpdateAveragePriceReqDto } from './models/dto/req/update-average-price.req.req.dto';
// import { AveragePriceService } from './services/average-prices.service';

// @Controller('average-prices')
// export class AveragePriceController {
//   constructor(private readonly averagePriceService: AveragePriceService) {}

//   @Get()
//   @ApiQuery({ name: 'region', required: false, type: String })
//   @ApiQuery({ name: 'brand', required: false, type: String })
//   @ApiQuery({ name: 'model', required: false, type: String })
//   async getAveragePrices(@Query() query: GetAveragePriceReqDto) {
//     return await this.averagePriceService.getAveragePrices(query);
//   }

//   @Patch(':id')
//   async updateAveragePrice(
//     @Param('id', ParseIntPipe) id: string,
//     @Body() updateDto: UpdateAveragePriceReqDto,
//   ) {
//     return await this.averagePriceService.updateAveragePrice(id, updateDto);
//   }
// }

// average-price.controller.ts

import { Controller, Get, Query } from '@nestjs/common';

import { CreateUpdateAveragePriceReqDto } from './models/dto/req/create-update-average-price.req.dto';
import { AveragePriceResDto } from './models/dto/res/average-price.res.dto';
import { AveragePriceService } from './services/average-prices.service';

@Controller('average-prices')
export class AveragePriceController {
  constructor(private readonly averagePriceService: AveragePriceService) {}

  @Get()
  async getAveragePrice(
    @Query() filters: CreateUpdateAveragePriceReqDto,
  ): Promise<AveragePriceResDto> {
    return await this.averagePriceService.calculateAveragePrice(filters);
  }
}
