import { IsNumber } from 'class-validator';

export class AveragePriceResDto {
  @IsNumber()
  averagePrice: number; // Средняя цена

  @IsNumber()
  count: number; // Количество объявлений, по которым был произведен расчет
}
