import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ViewStatistic } from '../../database/entities/views-statistic.entity';
import { CreateViewStatisticDto } from './models/dto/req/create-views-statistic.req.dto';
import { UpdateViewStatisticDto } from './models/dto/req/update-views-statistic.req.dto';
import { ViewStatisticsService } from './services/views-statistics.service';

@ApiTags('Статистика просмотров')
@Controller('view-statistics')
export class ViewStatisticsController {
  constructor(private readonly viewStatisticsService: ViewStatisticsService) {}

  @ApiOperation({
    summary: 'Создание статистики просмотров',
    description: 'Создание статистики просмотров по указанному объявлению',
  })
  @Post()
  async create(
    @Body() createViewStatisticDto: CreateViewStatisticDto,
  ): Promise<ViewStatistic> {
    return await this.viewStatisticsService.create(createViewStatisticDto);
  }

  @ApiOperation({
    summary: 'Обновление статистики просмотров',
    description: 'Обновление статистики просмотров по указанному объявлению',
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateViewStatisticDto: UpdateViewStatisticDto,
  ): Promise<ViewStatistic> {
    return await this.viewStatisticsService.update(id, updateViewStatisticDto);
  }

  @ApiOperation({
    summary: 'Получение статистики просмотров',
    description: 'Получение статистики просмотров по указанному объявлению',
  })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<ViewStatistic> {
    return await this.viewStatisticsService.findById(id);
  }

  @ApiOperation({
    summary: 'Получение статистики просмотров по объявлению',
    description: 'Получение статистики просмотров по указанному объявлению',
  })
  @Get('listing/:listingId')
  async findByListingId(
    @Param('listingId') listingId: string,
  ): Promise<ViewStatistic[]> {
    return await this.viewStatisticsService.findByListingId(listingId);
  }
}
