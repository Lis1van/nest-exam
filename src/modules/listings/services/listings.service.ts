import { Injectable } from '@nestjs/common';

import { CreateListingReqDto } from '../models/dto/req/create-listing.req.dto';
import { MarkForReviewReqDto } from '../models/dto/req/mark-for-review.req.dto';
import { UpdateListingReqDto } from '../models/dto/req/update-listing.req.dto';
import { Listing } from '../models/interfaces/listing.interface';
import { ProfanityFilterService } from './profanity-filter.service';

@Injectable()
export class ListingService {
  private listings: Listing[] = [];

  constructor(private readonly profanityFilter: ProfanityFilterService) {}

  async getAllListings(): Promise<Listing[]> {
    return this.listings;
  }

  async createListing(createListingDto: CreateListingReqDto): Promise<Listing> {
    const { title, description } = createListingDto;

    // Проверка на нецензурные слова
    if (
      this.profanityFilter.containsProfanity(title) ||
      this.profanityFilter.containsProfanity(description)
    ) {
      throw new Error('Объявление содержит недопустимую лексику');
    }

    const newListing: Listing = {
      id: String(this.listings.length + 1),
      ...createListingDto,
      status: 'active',
    };

    this.listings.push(newListing);
    return newListing;
  }

  async getListingById(id: string): Promise<Listing> {
    return this.listings.find((listing) => listing.id === id);
  }

  async updateListing(
    id: string,
    updateListingDto: UpdateListingReqDto,
  ): Promise<Listing> {
    const listing = await this.getListingById(id);
    if (!listing) throw new Error('Объявление не найдено');

    Object.assign(listing, updateListingDto);
    return listing;
  }

  async deleteListing(id: string): Promise<void> {
    this.listings = this.listings.filter((listing) => listing.id !== id);
  }

  async markListingForReview(
    id: string,
    markForReviewDto: MarkForReviewReqDto,
  ): Promise<void> {
    const listing = await this.getListingById(id);
    if (!listing) throw new Error('Объявление не найдено');

    // Логика обработки причины проверки (reason)
    console.log(
      `Объявление ${id} отправлено на проверку по причине: ${markForReviewDto.reason}`,
    );

    listing.status = 'review';
  }
}
