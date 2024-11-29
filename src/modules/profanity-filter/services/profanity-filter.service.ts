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

  /**
   * Проверяет текст на наличие нецензурной лексики.
   * @param text Текст для проверки.
   */
  checkProfanity(text: string): void {
    if (leoProfanity.check(text)) {
      throw new BadRequestException('Текст содержит нецензурную лексику.');
    }
  }

  /**
   * Добавляет слова в список запрещённых слов.
   * @param words Массив слов для добавления.
   */
  add(words: string[]): void {
    leoProfanity.add(words);
  }

  /**
   * Удаляет слова из списка запрещённых слов.
   * @param words Массив слов для удаления.
   */
  remove(words: string[]): void {
    leoProfanity.remove(words);
  }
}
