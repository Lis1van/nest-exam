import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

import { ViewStatistic } from '../../database/entities/views-statistic.entity';
import { CreateViewStatisticDto } from './models/dto/req/create-views-statistic.req.dto';
import { UpdateViewStatisticDto } from './models/dto/req/update-views-statistic.req.dto';
import { ViewStatisticsService } from './services/views-statistics.service';

@Controller('view-statistics')
export class ViewStatisticsController {
  constructor(private readonly viewStatisticsService: ViewStatisticsService) {}

  @Post()
  async create(
    @Body() createViewStatisticDto: CreateViewStatisticDto,
  ): Promise<ViewStatistic> {
    return await this.viewStatisticsService.create(createViewStatisticDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateViewStatisticDto: UpdateViewStatisticDto,
  ): Promise<ViewStatistic> {
    return await this.viewStatisticsService.update(id, updateViewStatisticDto);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<ViewStatistic> {
    return await this.viewStatisticsService.findById(id);
  }

  @Get('listing/:listingId')
  async findByListingId(
    @Param('listingId') listingId: string,
  ): Promise<ViewStatistic[]> {
    return await this.viewStatisticsService.findByListingId(listingId);
  }
}
