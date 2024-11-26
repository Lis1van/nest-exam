import { Module } from '@nestjs/common';

import { ViewsStatisticsService } from './services/views-statistics.service';
import { ViewsStatisticsController } from './views-statistics.controller';

@Module({
  controllers: [ViewsStatisticsController],
  providers: [ViewsStatisticsService],
})
export class ViewsStatisticsModule {}
