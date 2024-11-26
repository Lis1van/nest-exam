import { ApiProperty } from '@nestjs/swagger';
// import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Имя пользователя, должно быть заполнено',
    example: 'John Doe', // Пример имени пользователя
  })
  // @IsString()
  // @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Уникальный адрес электронной почты пользователя',
    example: 'john.doe@example.com', // Пример электронной почты
  })
  // @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Пароль пользователя, должно быть заполнено',
    example: 'P@ssw0rd', // Пример пароля
  })
  // @IsString()
  // @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Тип аккаунта пользователя',
    example: 'basic',
    enum: ['basic', 'premium'],
  })
  // @IsEnum(['basic', 'premium'])
  accountType?: string;

  @ApiProperty({
    description: 'Регион пользователя',
    example: 'Москва', // Пример региона
  })
  // @IsString()
  region?: string;
}
