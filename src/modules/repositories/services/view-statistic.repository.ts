import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { ViewStatistic } from '../../../database/entities/views-statistic.entity';

@Injectable()
export class ViewStatisticRepository extends Repository<ViewStatistic> {
  // Дополнительные методы.
}
