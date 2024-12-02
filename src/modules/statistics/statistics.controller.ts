import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { StatisticsSummaryResDto } from './models/dto/res/statistics-summary.res.dto';
import { UserStatisticsResDto } from './models/dto/res/user-statistics.res.dto';
import { StatisticsService } from './services/statistics.service';

@ApiTags('Статистика')
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @ApiOperation({
    summary: 'Получение общей статистики',
    description: 'Получение общей статистики по всем пользователям',
  })
  @Get('summary')
  async getSummary(): Promise<StatisticsSummaryResDto> {
    const data = await this.statisticsService.getSummary();
    return new StatisticsSummaryResDto(data);
  }

  @ApiOperation({
    summary: 'Получение статистики по пользователю',
    description: 'Получение статистики по конкретному пользователю',
  })
  @Get('user/:userId')
  async getUserStatistics(
    @Param('userId') userId: string,
  ): Promise<UserStatisticsResDto> {
    const data = await this.statisticsService.getUserStatistics(userId);
    return new UserStatisticsResDto(data);
  }
}
