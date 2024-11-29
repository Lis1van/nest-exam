// import { ApiProperty } from '@nestjs/swagger';
// import { IsNotEmpty, IsString } from 'class-validator';

// export class CreateListingReqDto {
//   @ApiProperty({
//     description: 'Заголовок объявления',
//     example: 'Продаю автомобиль',
//   })
//   @IsString()
//   @IsNotEmpty()
//   title: string;

//   @ApiProperty({
//     description: 'Описание объявления',
//     example: 'Отличное состояние, торг уместен',
//   })
//   @IsString()
//   @IsNotEmpty()
//   description: string;

//   @ApiProperty({
//     description: 'ID пользователя, создавшего объявление',
//     example: '123',
//   })
//   @IsString()
//   @IsNotEmpty()
//   userId: string;
// }

import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateListingReqDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  brandId: string;

  @IsNotEmpty()
  @IsString()
  modelId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @IsEnum(['USD', 'EUR', 'UAH'])
  currency: 'USD' | 'EUR' | 'UAH';

  @IsNotEmpty()
  @IsString()
  description: string;
}
