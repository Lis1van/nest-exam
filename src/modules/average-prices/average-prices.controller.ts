import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateUpdateAveragePriceReqDto } from './models/dto/req/create-update-average-price.req.dto';
import { AveragePriceResDto } from './models/dto/res/average-price.res.dto';
import { AveragePriceService } from './services/average-prices.service';

@ApiTags('Средние цены')
@Controller('average-prices')
export class AveragePriceController {
  constructor(private readonly averagePriceService: AveragePriceService) {}

  @ApiOperation({
    summary: 'Получить средние цены',
    description: 'Получить средние цены по фильтрам',
  })
  @Get()
  async getAveragePrice(
    @Query() filters: CreateUpdateAveragePriceReqDto,
  ): Promise<AveragePriceResDto> {
    return await this.averagePriceService.calculateAveragePrice(filters);
  }
}
