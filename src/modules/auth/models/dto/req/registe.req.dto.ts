import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { CreateAuthReqDto } from './create-auth.req.dto';

export class RegisterReqDto extends CreateAuthReqDto {
  @ApiProperty({ description: 'Имя пользователя', example: 'John Doe' })
  @IsString()
  @IsOptional()
  name?: string;
}
