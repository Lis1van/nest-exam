import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Listing } from '../../../database/entities/listing.entity';
import { CreateUpdateAveragePriceReqDto } from '../models/dto/req/create-update-average-price.req.dto';
import { AveragePriceResDto } from '../models/dto/res/average-price.res.dto';

@Injectable()
export class AveragePriceService {
  constructor(
    @InjectRepository(Listing)
    private readonly listingRepository: Repository<Listing>,
  ) {}

  async calculateAveragePrice(
    filters: CreateUpdateAveragePriceReqDto,
  ): Promise<AveragePriceResDto> {
    const queryBuilder = this.listingRepository.createQueryBuilder('listing');

    // Применение фильтров, если они заданы
    if (filters.region) {
      queryBuilder.andWhere('listing.region = :region', {
        region: filters.region,
      });
    }

    if (filters.accountType) {
      queryBuilder.andWhere('listing.accountType = :accountType', {
        accountType: filters.accountType,
      });
    }

    if (filters.minPrice) {
      queryBuilder.andWhere('listing.price >= :minPrice', {
        minPrice: filters.minPrice,
      });
    }

    if (filters.maxPrice) {
      queryBuilder.andWhere('listing.price <= :maxPrice', {
        maxPrice: filters.maxPrice,
      });
    }

    // Выполнение запроса для подсчета средней цены и количества
    const result = await queryBuilder
      .select('AVG(listing.price)', 'averagePrice')
      .addSelect('COUNT(listing.id)', 'count')
      .getRawOne();

    return {
      averagePrice: result.averagePrice || 0, // Если нет данных, возвращаем 0
      count: result.count || 0,
    };
  }
}
