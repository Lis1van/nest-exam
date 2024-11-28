import { Injectable } from '@nestjs/common';

@Injectable()
export class ListingReviewService {
  async reviewListing(id: string): Promise<void> {
    // Логика проверки объявления
  }
}
