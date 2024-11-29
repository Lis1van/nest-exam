// import { Injectable } from '@nestjs/common';

// import { CreateListingReqDto } from '../models/dto/req/create-listing.req.dto';
// import { MarkForReviewReqDto } from '../models/dto/req/mark-for-review.req.dto';
// import { UpdateListingReqDto } from '../models/dto/req/update-listing.req.dto';
// import { Listing } from '../models/interfaces/listing.interface';
// import { ProfanityFilterService } from './profanity-filter.service';

// @Injectable()
// export class ListingService {
//   private listings: Listing[] = [];

//   constructor(private readonly profanityFilter: ProfanityFilterService) {}

//   async getAllListings(): Promise<Listing[]> {
//     return this.listings;
//   }

//   async createListing(createListingDto: CreateListingReqDto): Promise<Listing> {
//     const { title, description } = createListingDto;

//     // Проверка на нецензурные слова
//     if (
//       this.profanityFilter.containsProfanity(title) ||
//       this.profanityFilter.containsProfanity(description)
//     ) {
//       throw new Error('Объявление содержит недопустимую лексику');
//     }

//     const newListing: Listing = {
//       id: String(this.listings.length + 1),
//       ...createListingDto,
//       status: 'active',
//     };

//     this.listings.push(newListing);
//     return newListing;
//   }

//   async getListingById(id: string): Promise<Listing> {
//     return this.listings.find((listing) => listing.id === id);
//   }

//   async updateListing(
//     id: string,
//     updateListingDto: UpdateListingReqDto,
//   ): Promise<Listing> {
//     const listing = await this.getListingById(id);
//     if (!listing) throw new Error('Объявление не найдено');

//     Object.assign(listing, updateListingDto);
//     return listing;
//   }

//   async deleteListing(id: string): Promise<void> {
//     this.listings = this.listings.filter((listing) => listing.id !== id);
//   }

//   async markListingForReview(
//     id: string,
//     markForReviewDto: MarkForReviewReqDto,
//   ): Promise<void> {
//     const listing = await this.getListingById(id);
//     if (!listing) throw new Error('Объявление не найдено');

//     // Логика обработки причины проверки (reason)
//     console.log(
//       `Объявление ${id} отправлено на проверку по причине: ${markForReviewDto.reason}`,
//     );

//     listing.status = 'review';
//   }
// }

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfanityFilterService } from 'src/modules/profanity-filter/services/profanity-filter.service';
import { Repository } from 'typeorm';

import { Listing } from '../../../database/entities/listing.entity';
import { CreateListingReqDto } from '../models/dto/req/create-listing.req.dto';
import { UpdateListingReqDto } from '../models/dto/req/update-listing.req.dto';

@Injectable()
export class ListingsService {
  constructor(
    @InjectRepository(Listing)
    private readonly listingRepository: Repository<Listing>,
    private readonly profanityFilterService: ProfanityFilterService, //Внедряем фильтр-сервис
  ) {}

  async createListing(dto: CreateListingReqDto): Promise<Listing> {
    // Добавляем дополнительные слова в фильтр
    this.profanityFilterService.add(['extraWord1', 'extraWord2']);
    // Удаляем ненужные слова из фильтра
    this.profanityFilterService.remove(['wordToRemove']);

    // Проверяем текст на нецензурную лексику
    this.profanityFilterService.checkProfanity(dto.description);
    const listing = this.listingRepository.create(dto);
    return await this.listingRepository.save(listing);
  }

  async updateListing(id: string, dto: UpdateListingReqDto): Promise<Listing> {
    const listing = await this.listingRepository.findOne({ where: { id } });
    if (!listing) throw new NotFoundException('Listing not found');

    // Добавляем дополнительные слова в фильтр
    this.profanityFilterService.add(['extraWord1', 'extraWord2']);
    // Удаляем ненужные слова из фильтра
    this.profanityFilterService.remove(['wordToRemove']);

    // Проверяем текст на нецензурную лексику, если описание обновляется
    if (dto.description) {
      this.profanityFilterService.checkProfanity(dto.description);
    }

    return await this.listingRepository.save({ ...listing, ...dto });
  }

  async findOne(id: string): Promise<Listing> {
    const listing = await this.listingRepository.findOne({
      where: { id },
    });
    if (!listing) throw new NotFoundException('Listing not found');
    return listing;
  }
}
