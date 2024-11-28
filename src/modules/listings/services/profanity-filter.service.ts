import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfanityFilterService {
  private profanityWords = ['badword1', 'badword2']; // Список нецензурных слов

  containsProfanity(text: string): boolean {
    return this.profanityWords.some((word) =>
      text.toLowerCase().includes(word),
    );
  }
}
