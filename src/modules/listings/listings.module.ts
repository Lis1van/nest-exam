// import { Module } from '@nestjs/common';

// import { ListingsController } from './listings.controller';
// import { ListingReviewService } from './services/listing-review.service';
// import { ListingService } from './services/listings.service';
// import { ProfanityFilterService } from './services/profanity-filter.service';

// @Module({
//   controllers: [ListingsController],
//   providers: [ListingService, ListingReviewService, ProfanityFilterService],
// })
// export class ListingsModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Listing } from '../../database/entities/listing.entity';
import { ProfanityFilterModule } from '../profanity-filter/profanity-filter.module';
import { ListingsController } from './listings.controller';
import { ListingsService } from './services/listings.service';

@Module({
  imports: [TypeOrmModule.forFeature([Listing]), ProfanityFilterModule],
  controllers: [ListingsController],
  providers: [ListingsService],
  exports: [ListingsService],
})
export class ListingsModule {}
