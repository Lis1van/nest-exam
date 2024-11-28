import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserReqDto {
  @ApiProperty({ description: 'Имя пользователя', example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Электронная почта',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Пароль', example: 'P@ssw0rd' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
