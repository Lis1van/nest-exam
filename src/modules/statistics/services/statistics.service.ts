import { Injectable } from '@nestjs/common';

import { CreateStatisticDto } from '../models/dto/req/create-statistic.req.dto';
import { UpdateStatisticDto } from '../models/dto/req/update-statistic.req.dto';

@Injectable()
export class StatisticsService {
  create(createStatisticDto: CreateStatisticDto) {
    return 'This action adds a new statistic';
  }

  findAll() {
    return `This action returns all statistics`;
  }

  findOne(id: number) {
    return `This action returns a #${id} statistic`;
  }

  update(id: number, updateStatisticDto: UpdateStatisticDto) {
    return `This action updates a #${id} statistic`;
  }

  remove(id: number) {
    return `This action removes a #${id} statistic`;
  }
}
