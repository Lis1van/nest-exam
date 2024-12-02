import { ApiProperty } from '@nestjs/swagger';

export class ListingResponseDto {
  @ApiProperty({ description: 'ID объявления', example: 'uuid' })
  id: string;

  @ApiProperty({ description: 'ID бренда автомобиля', example: 'uuid' })
  brandId: string;

  @ApiProperty({ description: 'ID модели автомобиля', example: 'uuid' })
  modelId: string;

  @ApiProperty({ description: 'Цена автомобиля', example: 15000 })
  price: number;

  @ApiProperty({
    description: 'Валюта цены',
    enum: ['USD', 'EUR', 'UAH'],
    example: 'USD',
  })
  currency: 'USD' | 'EUR' | 'UAH';

  @ApiProperty({
    description: 'Описание автомобиля',
    example: 'Отличное состояние, гаражное хранение',
  })
  description: string;

  @ApiProperty({
    description: 'Статус объявления',
    enum: ['active', 'inactive', 'moderation'],
    example: 'active',
  })
  status: 'active' | 'inactive' | 'moderation';

  @ApiProperty({ description: 'Количество попыток редактирования', example: 2 })
  editAttempts: number;

  @ApiProperty({ description: 'Курс обмена валют', example: 1.1 })
  exchangeRate: number;

  @ApiProperty({ description: 'Оригинальная валюта цены', example: 'USD' })
  originalCurrency: string;

  @ApiProperty({
    description: 'Дата создания объявления',
    example: '2024-11-30T12:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Дата последнего обновления объявления',
    example: '2024-11-30T12:00:00Z',
  })
  updatedAt: Date;
}
