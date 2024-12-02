import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString, Min, ValidateIf } from 'class-validator';

export class UpdateListingReqDto {
  @ApiPropertyOptional({
    description: 'Описание автомобиля',
    example: 'Обновленное описание',
  })
  @ValidateIf((o) => o.description !== undefined)
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Обновленная цена автомобиля',
    example: 14000,
  })
  @ValidateIf((o) => o.price !== undefined)
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiPropertyOptional({
    description: 'Обновленная валюта цены',
    enum: ['USD', 'EUR', 'UAH'],
    example: 'EUR',
  })
  @ValidateIf((o) => o.currency !== undefined)
  @IsEnum(['USD', 'EUR', 'UAH'])
  currency?: 'USD' | 'EUR' | 'UAH';

  @ApiPropertyOptional({
    description: 'Статус объявления',
    enum: ['active', 'inactive', 'moderation'],
    example: 'active',
  })
  @ValidateIf((o) => o.status !== undefined)
  @IsEnum(['active', 'inactive', 'moderation'])
  status?: 'active' | 'inactive' | 'moderation';
}
