import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateListingReqDto {
  @ApiProperty({
    description: 'ID пользователя, который создает объявление',
    example: 'uuid',
  })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({ description: 'ID бренда автомобиля', example: 'uuid' })
  @IsNotEmpty()
  @IsString()
  brandId: string;

  @ApiProperty({ description: 'ID модели автомобиля', example: 'uuid' })
  @IsNotEmpty()
  @IsString()
  modelId: string;

  @ApiProperty({ description: 'Цена автомобиля', example: 15000 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    description: 'Валюта цены',
    enum: ['USD', 'EUR', 'UAH'],
    example: 'USD',
  })
  @IsNotEmpty()
  @IsEnum(['USD', 'EUR', 'UAH'])
  currency: 'USD' | 'EUR' | 'UAH';

  @ApiProperty({
    description: 'Описание автомобиля',
    example: 'Отличное состояние, гаражное хранение',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
