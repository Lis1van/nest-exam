import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterReqDto {
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

  @ApiProperty({
    description: 'Имя пользователя',
    example: 'John Doe',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Роль пользователя (по умолчанию - user)',
    example: 'user',
    enum: ['buyer', 'user', 'manager', 'admin'],
  })
  @IsString()
  @IsOptional()
  role?: string;
}
