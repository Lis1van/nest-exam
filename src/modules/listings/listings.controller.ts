import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateListingReqDto } from './models/dto/req/create-listing.req.dto';
import { MarkForReviewReqDto } from './models/dto/req/mark-for-review.req.dto';
import { UpdateListingReqDto } from './models/dto/req/update-listing.req.dto';
import { ListingResDto } from './models/dto/res/listing.res.dto';
import { ListingService } from './services/listings.service';

@Controller('listings')
export class ListingsController {
  constructor(private readonly listingService: ListingService) {}

  @Get()
  async getAllListings(): Promise<ListingResDto[]> {
    return await this.listingService.getAllListings();
  }

  @Post()
  async createListing(
    @Body() createListingDto: CreateListingReqDto,
  ): Promise<ListingResDto> {
    return await this.listingService.createListing(createListingDto);
  }

  @Get(':id')
  async getListingById(@Param('id') id: string): Promise<ListingResDto> {
    return await this.listingService.getListingById(id);
  }

  @Patch(':id')
  async updateListing(
    @Param('id') id: string,
    @Body() updateListingDto: UpdateListingReqDto,
  ): Promise<ListingResDto> {
    return await this.listingService.updateListing(id, updateListingDto);
  }

  @Delete(':id')
  async deleteListing(@Param('id') id: string): Promise<void> {
    return await this.listingService.deleteListing(id);
  }

  @Post(':id/mark-for-review')
  async markListingForReview(
    @Param('id') id: string,
    @Body() markForReviewDto: MarkForReviewReqDto,
  ): Promise<void> {
    return await this.listingService.markListingForReview(id, markForReviewDto);
  }
}
