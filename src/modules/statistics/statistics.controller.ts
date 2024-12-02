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
