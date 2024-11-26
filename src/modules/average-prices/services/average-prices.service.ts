import { Injectable } from '@nestjs/common';

import { CreateAveragePriceDto } from '../models/dto/req/create-average-price.req.dto';
import { UpdateAveragePriceDto } from '../models/dto/req/update-average-price.req.dto';

@Injectable()
export class AveragePricesService {
  create(createAveragePriceDto: CreateAveragePriceDto) {
    return 'This action adds a new averagePrice';
  }

  findAll() {
    return `This action returns all averagePrices`;
  }

  findOne(id: number) {
    return `This action returns a #${id} averagePrice`;
  }

  update(id: number, updateAveragePriceDto: UpdateAveragePriceDto) {
    return `This action updates a #${id} averagePrice`;
  }

  remove(id: number) {
    return `This action removes a #${id} averagePrice`;
  }
}
