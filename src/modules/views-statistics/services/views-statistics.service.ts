import { Injectable } from '@nestjs/common';

import { CreateViewsStatisticDto } from '../models/dto/req/create-views-statistic.req.dto';
import { UpdateViewsStatisticDto } from '../models/dto/req/update-views-statistic.req.dto';

@Injectable()
export class ViewsStatisticsService {
  create(createViewsStatisticDto: CreateViewsStatisticDto) {
    return 'This action adds a new viewsStatistic';
  }

  findAll() {
    return `This action returns all viewsStatistics`;
  }

  findOne(id: number) {
    return `This action returns a #${id} viewsStatistic`;
  }

  update(id: number, updateViewsStatisticDto: UpdateViewsStatisticDto) {
    return `This action updates a #${id} viewsStatistic`;
  }

  remove(id: number) {
    return `This action removes a #${id} viewsStatistic`;
  }
}
