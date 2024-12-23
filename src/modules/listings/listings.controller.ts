import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Listing } from '../../database/entities/listing.entity';
import { CreateListingReqDto } from './models/dto/req/create-listing.req.dto';
import { ListingsService } from './services/listings.service';

@ApiTags('Объявления')
@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @ApiOperation({
    summary: 'Создание нового объявления',
    description: 'Создание нового объявления',
  })
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
    const userId = createListingDto.userId;
    return await this.listingsService.createListing(createListingDto, userId);
  }

  @ApiOperation({
    summary: 'Обновление статуса объявления',
    description: 'Обновление статуса объявления',
  })
  @Patch('status/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Статус объявления обновлен.',
    type: Listing,
  })
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ): Promise<Listing> {
    return await this.listingsService.updateListingStatus(id, status);
  }
}
