import { Controller } from '@nestjs/common';

import { MailService } from './services/mailer.service';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailService) {}
}
