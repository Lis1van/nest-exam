import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendModerationRequest(to: string, listingId: string) {
    await this.mailerService.sendMail({
      to,
      subject: 'Объявление на модерации',
      template: './moderation', // Указываем шаблон письма (см. раздел 5)
      context: {
        listingId,
      },
    });
  }

  async sendStatusChangeEmail(to: string, status: string) {
    await this.mailerService.sendMail({
      to,
      subject: 'Обновление статуса объявления',
      template: './status-update',
      context: {
        status,
      },
    });
  }

  async sendStatusUpdate(to: string, status: string) {
    await this.mailerService.sendMail({
      to,
      subject: 'Обновление статуса объявления',
      template: './status-update', // Указываем шаблон письма
      context: {
        status,
      },
    });
  }
}
