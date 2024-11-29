// import { Injectable } from '@nestjs/common';

// import { CreateStatisticDto } from '../models/dto/req/create-statistic.req.dto';
// import { UpdateStatisticDto } from '../models/dto/req/update-statistic.req.dto';

// @Injectable()
// export class StatisticsService {
//   create(createStatisticDto: CreateStatisticDto) {
//     return 'This action adds a new statistic';
//   }

//   findAll() {
//     return `This action returns all statistics`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} statistic`;
//   }

//   update(id: number, updateStatisticDto: UpdateStatisticDto) {
//     return `This action updates a #${id} statistic`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} statistic`;
//   }
// }

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Listing } from '../../../database/entities/listing.entity';
import { User } from '../../../database/entities/user.entity';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Listing)
    private readonly listingRepository: Repository<Listing>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Метод для получения общей статистики
  async getSummary() {
    const totalListings = await this.listingRepository.count(); // Общее количество объявлений
    const totalUsers = await this.userRepository.count(); // Общее количество пользователей
    const averagePrice = await this.listingRepository
      .createQueryBuilder('listing')
      .select('AVG(listing.price)', 'averagePrice')
      .getRawOne();

    return {
      totalListings,
      totalUsers,
      averagePrice: Number(averagePrice.averagePrice) || 0,
    };
  }

  // Метод для получения статистики конкретного пользователя
  async getUserStatistics(userId: string) {
    const totalListings = await this.listingRepository.count({
      where: { userId },
    });
    const totalViews = await this.listingRepository
      .createQueryBuilder('listing')
      .where('listing.userId = :userId', { userId })
      .select('SUM(listing.views)', 'totalViews')
      .getRawOne();
    const averagePrice = await this.listingRepository
      .createQueryBuilder('listing')
      .where('listing.userId = :userId', { userId })
      .select('AVG(listing.price)', 'averagePrice')
      .getRawOne();

    return {
      userId,
      totalListings,
      totalViews: Number(totalViews.totalViews) || 0,
      averagePrice: Number(averagePrice.averagePrice) || 0,
    };
  }
}
