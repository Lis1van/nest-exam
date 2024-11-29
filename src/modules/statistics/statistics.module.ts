// import { Module } from '@nestjs/common';

// import { StatisticsService } from './services/statistics.service';
// import { StatisticsController } from './statistics.controller';

// @Module({
//   controllers: [StatisticsController],
//   providers: [StatisticsService],
// })
// export class StatisticsModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Listing } from '../../database/entities/listing.entity';
import { User } from '../../database/entities/user.entity';
import { StatisticsService } from './services/statistics.service';
import { StatisticsController } from './statistics.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Listing, User])],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}
