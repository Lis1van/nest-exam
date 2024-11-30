// import { CreateAuthReqDto } from './create-auth.req.dto';

// export class LoginReqDto extends CreateAuthReqDto {}

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginReqDto {
  @ApiProperty({
    description: 'Электронная почта',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Пароль', example: 'P@ssw0rd' })
  @IsNotEmpty()
  password: string;
}
