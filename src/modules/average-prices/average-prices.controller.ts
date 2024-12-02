import { Controller, Get, Query } from '@nestjs/common';

import { CreateUpdateAveragePriceReqDto } from './models/dto/req/create-update-average-price.req.dto';
import { AveragePriceResDto } from './models/dto/res/average-price.res.dto';
import { AveragePriceService } from './services/average-prices.service';

@Controller('average-prices')
export class AveragePriceController {
  constructor(private readonly averagePriceService: AveragePriceService) {}

  @Get()
  async getAveragePrice(
    @Query() filters: CreateUpdateAveragePriceReqDto,
  ): Promise<AveragePriceResDto> {
    return await this.averagePriceService.calculateAveragePrice(filters);
  }
}
