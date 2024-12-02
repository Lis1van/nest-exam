import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUpdateAveragePriceReqDto {
  @IsOptional()
  @IsString()
  region?: string; // Регион для фильтрации

  @IsOptional()
  @IsEnum(['basic', 'premium'])
  accountType?: 'basic' | 'premium'; // Тип аккаунта для фильтрации

  @IsOptional()
  @IsNumber()
  minPrice?: number; // Минимальная цена

  @IsOptional()
  @IsNumber()
  maxPrice?: number; // Максимальная цена
}
