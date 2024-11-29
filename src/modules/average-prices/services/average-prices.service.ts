// import { Injectable } from '@nestjs/common';

// import { CreateAveragePriceDto } from '../models/dto/req/create-average-price.req.dto';
// import { UpdateAveragePriceDto } from '../models/dto/req/update-average-price.req.dto';

// @Injectable()
// export class AveragePricesService {
//   create(createAveragePriceDto: CreateAveragePriceDto) {
//     return 'This action adds a new averagePrice';
//   }

//   findAll() {
//     return `This action returns all averagePrices`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} averagePrice`;
//   }

//   update(id: number, updateAveragePriceDto: UpdateAveragePriceDto) {
//     return `This action updates a #${id} averagePrice`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} averagePrice`;
//   }
// }

// src/average-price/average-price.service.ts

// @Injectable()
// export class AveragePriceService {
//   constructor(
//     @InjectRepository(AveragePrice)
//     private averagePriceRepository: Repository<AveragePrice>,
//   ) {}
//   async getAveragePrices(query: GetAveragePriceReqDto) {
//     const { region, brand, model } = query;
//     const queryBuilder =
//       this.averagePriceRepository.createQueryBuilder('averagePrice');
//     if (region)
//       queryBuilder.andWhere('averagePrice.region = :region', { region });
//     if (brand)
//       queryBuilder.andWhere('averagePrice.brand.name = :brand', { brand });
//     if (model)
//       queryBuilder.andWhere('averagePrice.model.name = :model', { model });
//     return await queryBuilder.getMany();
//   }
//   async updateAveragePrice(id: string, updateDto: UpdateAveragePriceReqDto) {
//     await this.averagePriceRepository.update(id, {
//       ...updateDto,
//       updatedAt: new Date(),
//     });
//     return await this.averagePriceRepository.findOne({ where: { id } });
//   }
// }
// average-price.service.ts
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
