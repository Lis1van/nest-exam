import { IsInt, IsOptional, IsUUID } from 'class-validator';

export class UpdateViewStatisticDto {
  @IsUUID()
  @IsOptional()
  listingId?: string; // Идентификатор объявления

  @IsInt()
  @IsOptional()
  viewsDaily?: number; // Просмотры за день

  @IsInt()
  @IsOptional()
  viewsWeekly?: number; // Просмотры за неделю

  @IsInt()
  @IsOptional()
  viewsMonthly?: number; // Просмотры за месяц
}
