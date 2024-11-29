import { Module } from '@nestjs/common';

import { ProfanityFilterService } from './services/profanity-filter.service';

@Module({
  providers: [ProfanityFilterService],
  exports: [ProfanityFilterService], // Экспортируем сервис, чтобы использовать в других модулях
})
export class ProfanityFilterModule {}
