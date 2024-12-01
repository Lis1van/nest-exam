// import { Body, Controller, Get, Param, Post } from '@nestjs/common';

// import { Listing } from '../../database/entities/listing.entity';
// import { ListingsService } from './services/listings.service';

// @Controller('listings')
// export class ListingsController {
//   constructor(private readonly listingsService: ListingsService) {}

//   // Метод для создания нового объявления
//   @Post()
//   async create(@Body() createListingDto: any): Promise<Listing> {
//     return await this.listingsService.createListing(createListingDto);
//   }

//   // Метод для получения всех объявлений
//   @Get()
//   async findAll(): Promise<Listing[]> {
//     return await this.listingsService.getAllListings();
//   }

//   // Метод для обновления валюты объявления
//   @Post('updateCurrency/:id')
//   async updateCurrency(
//     @Body() body: any,
//     @Param('id') id: string,
//   ): Promise<Listing> {
//     return await this.listingsService.updateListingCurrency(id);
//   }
// }

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { Listing } from '../../database/entities/listing.entity';
import { CreateListingReqDto } from './models/dto/req/create-listing.req.dto';
import { ListingsService } from './services/listings.service';

@ApiTags('Listings')
@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Объявление успешно создано.',
    type: Listing,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Ошибка валидации входных данных.',
  })
  async create(
    @Body() createListingDto: CreateListingReqDto,
  ): Promise<Listing> {
    const userId = createListingDto.userId; // Получаем userId из DTO
    return await this.listingsService.createListing(createListingDto, userId);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Список всех объявлений.',
    type: [Listing],
  })
  async findAll(): Promise<Listing[]> {
    return await this.listingsService.getAllListings();
  }

  @Post('updateCurrency/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Валюта объявления обновлена.',
    type: Listing,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Объявление не найдено.',
  })
  async updateCurrency(@Param('id') id: string): Promise<Listing> {
    return await this.listingsService.updateListingCurrency(id);
  }
}
