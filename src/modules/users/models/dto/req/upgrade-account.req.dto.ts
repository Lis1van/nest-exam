import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpgradeAccountReqDto {
  @ApiProperty({ description: 'Тип аккаунта', example: 'premium' })
  @IsString()
  @IsNotEmpty()
  accountType: 'basic' | 'premium';
}
