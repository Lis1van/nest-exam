import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateViewsStatisticDto } from './models/dto/req/create-views-statistic.req.dto';
import { UpdateViewsStatisticDto } from './models/dto/req/update-views-statistic.req.dto';
import { ViewsStatisticsService } from './services/views-statistics.service';

@Controller('views-statistics')
export class ViewsStatisticsController {
  constructor(
    private readonly viewsStatisticsService: ViewsStatisticsService,
  ) {}

  @Post()
  create(@Body() createViewsStatisticDto: CreateViewsStatisticDto) {
    return this.viewsStatisticsService.create(createViewsStatisticDto);
  }

  @Get()
  findAll() {
    return this.viewsStatisticsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.viewsStatisticsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateViewsStatisticDto: UpdateViewsStatisticDto,
  ) {
    return this.viewsStatisticsService.update(+id, updateViewsStatisticDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.viewsStatisticsService.remove(+id);
  }
}
