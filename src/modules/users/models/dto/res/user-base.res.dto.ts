import { ApiProperty } from '@nestjs/swagger';
// import { IsEmail, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

export class UserBaseResDto {
  @ApiProperty({ description: 'Уникальный идентификатор пользователя' })
  // @IsUUID()
  id: string;

  @ApiProperty({ description: 'Имя пользователя' })
  // @IsString()
  name: string;

  @ApiProperty({
    description: 'Электронная почта пользователя',
    example: 'user@example.com',
  })
  // @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Тип аккаунта пользователя',
    enum: ['basic', 'premium'],
    example: 'basic',
    default: 'basic',
  })
  // @IsEnum(['basic', 'premium'])
  accountType: 'basic' | 'premium';

  @ApiProperty({ description: 'Регион пользователя', required: false })
  // @IsOptional()
  // @IsString()
  region?: string;
}
