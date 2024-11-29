// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Param,
//   Patch,
//   Post,
// } from '@nestjs/common';

// import { CreateStatisticDto } from './models/dto/req/create-statistic.req.dto';
// import { UpdateStatisticDto } from './models/dto/req/update-statistic.req.dto';
// import { StatisticsService } from './services/statistics.service';

// @Controller('statistics')
// export class StatisticsController {
//   constructor(private readonly statisticsService: StatisticsService) {}

//   @Post()
//   create(@Body() createStatisticDto: CreateStatisticDto) {
//     return this.statisticsService.create(createStatisticDto);
//   }

//   @Get()
//   findAll() {
//     return this.statisticsService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.statisticsService.findOne(+id);
//   }

//   @Patch(':id')
//   update(
//     @Param('id') id: string,
//     @Body() updateStatisticDto: UpdateStatisticDto,
//   ) {
//     return this.statisticsService.update(+id, updateStatisticDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.statisticsService.remove(+id);
//   }
// }

import { Controller, Get, Param } from '@nestjs/common';

import { StatisticsSummaryResDto } from './models/dto/res/statistics-summary.res.dto';
import { UserStatisticsResDto } from './models/dto/res/user-statistics.res.dto';
import { StatisticsService } from './services/statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  // Эндпоинт для получения общей статистики
  @Get('summary')
  async getSummary(): Promise<StatisticsSummaryResDto> {
    const data = await this.statisticsService.getSummary();
    return new StatisticsSummaryResDto(data);
  }

  // Эндпоинт для получения статистики конкретного пользователя
  @Get('user/:userId')
  async getUserStatistics(
    @Param('userId') userId: string,
  ): Promise<UserStatisticsResDto> {
    const data = await this.statisticsService.getUserStatistics(userId);
    return new UserStatisticsResDto(data);
  }
}
