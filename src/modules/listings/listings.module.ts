import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Listing } from '../../database/entities/listing.entity';
import { ExchangeRateModule } from '../exchange-rate/exchange-rate.module';
import { MailService } from '../mailer/services/mailer.service';
import { ProfanityFilterModule } from '../profanity-filter/profanity-filter.module';
import { ListingsController } from './listings.controller';
import { ListingsService } from './services/listings.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Listing]),
    ProfanityFilterModule,
    ExchangeRateModule,
  ],
  controllers: [ListingsController],
  providers: [ListingsService, MailService],
  exports: [ListingsService],
})
export class ListingsModule {}
