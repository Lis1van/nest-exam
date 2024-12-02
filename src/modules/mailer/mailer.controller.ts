import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MailService } from './services/mailer.service';

@ApiTags('Почта')
@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailService) {}
}
