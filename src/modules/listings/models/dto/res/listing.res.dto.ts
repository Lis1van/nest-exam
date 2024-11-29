// import { ApiProperty } from '@nestjs/swagger';

// export class ListingResDto {
//   @ApiProperty({ description: 'ID объявления', example: '1' })
//   id: string;

//   @ApiProperty({
//     description: 'Заголовок объявления',
//     example: 'Продаю автомобиль',
//   })
//   title: string;

//   @ApiProperty({
//     description: 'Описание объявления',
//     example: 'Отличное состояние, торг уместен',
//   })
//   description: string;

//   @ApiProperty({ description: 'Статус объявления', example: 'active' })
//   status: string;
// }

export class ListingResponseDto {
  id: string;
  brandId: string;
  modelId: string;
  price: number;
  currency: 'USD' | 'EUR' | 'UAH';
  description: string;
  status: 'active' | 'inactive' | 'moderation';
  editAttempts: number;
  exchangeRate: number;
  originalCurrency: string;
  createdAt: Date;
  updatedAt: Date;
}
