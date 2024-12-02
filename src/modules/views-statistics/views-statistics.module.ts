import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ViewStatistic } from '../../database/entities/views-statistic.entity';
import { ViewStatisticRepository } from '../repositories/services/view-statistic.repository';
import { ViewStatisticsService } from './services/views-statistics.service';
import { ViewStatisticsController } from './views-statistics.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ViewStatistic, ViewStatisticRepository])],
  controllers: [ViewStatisticsController],
  providers: [ViewStatisticsService],
})
export class ViewStatisticsModule {}
