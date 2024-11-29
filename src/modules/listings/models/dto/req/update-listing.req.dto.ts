// import { ApiProperty } from '@nestjs/swagger';
// import { IsOptional, IsString } from 'class-validator';

// export class UpdateListingReqDto {
//   @ApiProperty({
//     description: 'Заголовок объявления',
//     example: 'Продаю автомобиль',
//     required: false,
//   })
//   @IsString()
//   @IsOptional()
//   title?: string;

//   @ApiProperty({
//     description: 'Описание объявления',
//     example: 'Отличное состояние',
//     required: false,
//   })
//   @IsString()
//   @IsOptional()
//   description?: string;
// }

import { IsEnum, IsNumber, IsString, Min, ValidateIf } from 'class-validator';

export class UpdateListingReqDto {
  @ValidateIf((o) => o.description !== undefined)
  @IsString()
  description?: string;

  @ValidateIf((o) => o.price !== undefined)
  @IsNumber()
  @Min(0)
  price?: number;

  @ValidateIf((o) => o.currency !== undefined)
  @IsEnum(['USD', 'EUR', 'UAH'])
  currency?: 'USD' | 'EUR' | 'UAH';

  @ValidateIf((o) => o.status !== undefined)
  @IsEnum(['active', 'inactive', 'moderation'])
  status?: 'active' | 'inactive' | 'moderation';
}
