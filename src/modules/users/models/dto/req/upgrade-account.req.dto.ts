import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpgradeAccountReqDto {
  @ApiProperty({ description: 'Идентификатор пользователя', example: '123' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'Тип аккаунта', example: 'premium' })
  @IsString()
  @IsNotEmpty()
  accountType: string;
}
