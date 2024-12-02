import { BadRequestException, Injectable } from '@nestjs/common';
import * as leoProfanity from 'leo-profanity';

@Injectable()
export class ProfanityFilterService {
  constructor() {
    // Устанавливаем поддерживаемые языки
    leoProfanity.loadDictionary('en');
    leoProfanity.loadDictionary('ru');

    // Добавляем дополнительные запрещённые слова (если нужно)
    leoProfanity.add(['yourcustomword1', 'yourcustomword2']);
  }

  // Проверяет текст на наличие нецензурной лексики.
  checkProfanity(text: string): any {
    if (leoProfanity.check(text)) {
      throw new BadRequestException('Текст содержит нецензурную лексику.');
    }
  }

  //Добавляет слова в список запрещённых слов.
  add(words: string[]): void {
    leoProfanity.add(words);
  }

  //Удаляет слова из списка запрещённых слов.
  remove(words: string[]): void {
    leoProfanity.remove(words);
  }
}
