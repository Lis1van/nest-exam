import { Module } from '@nestjs/common';

import { ListingsController } from './listings.controller';
import { ListingReviewService } from './services/listing-review.service';
import { ListingService } from './services/listings.service';
import { ProfanityFilterService } from './services/profanity-filter.service';

@Module({
  controllers: [ListingsController],
  providers: [ListingService, ListingReviewService, ProfanityFilterService],
})
export class ListingsModule {}
