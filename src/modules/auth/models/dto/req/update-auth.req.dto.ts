import { PartialType } from '@nestjs/swagger';

import { CreateAuthDto } from './create-auth.req.dto';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {}
