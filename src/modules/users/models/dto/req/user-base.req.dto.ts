import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { TransformHelper } from 'src/common/helpers/transform.helper';

import { AccountTypeEnum } from '../../enums/account-type.enum';

export class UserBaseReqDto {
  @ApiProperty({
    description: 'Имя пользователя, должно быть заполнено',
    example: 'John Doe', // Пример имени пользователя
  })
  @Transform(TransformHelper.trim) // Удаляет лишние пробелы
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Уникальный адрес электронной почты пользователя',
    example: 'john.doe@example.com', // Пример электронной почты
  })
  @Transform(TransformHelper.trim) // Удаляет лишние пробелы
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Пароль пользователя, должно быть заполнено',
    example: 'P@ssw0rd', // Пример пароля
  })
  @Transform(TransformHelper.trim) // Удаляет лишние пробелы
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Тип аккаунта пользователя',
    default: 'basic',
    enum: ['basic', 'premium'],
  })
  @IsOptional()
  @IsEnum(AccountTypeEnum)
  accountType?: AccountTypeEnum;

  @ApiProperty({
    description: 'Регион пользователя',
    example: 'Москва', // Пример региона
  })
  @IsOptional()
  @Transform(TransformHelper.trim) // Удаляет лишние пробелы
  @IsString()
  region?: string;
}
