import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateListingReqDto {
  @ApiProperty({
    description: 'Заголовок объявления',
    example: 'Продаю автомобиль',
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'Описание объявления',
    example: 'Отличное состояние',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
