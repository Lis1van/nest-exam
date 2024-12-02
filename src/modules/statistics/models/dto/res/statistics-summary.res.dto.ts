export class StatisticsSummaryResDto {
  totalListings: number; // Общее количество объявлений
  totalUsers: number; // Общее количество пользователей
  averagePrice: number; // Средняя цена всех объявлений

  constructor(data: Partial<StatisticsSummaryResDto>) {
    this.totalListings = data.totalListings;
    this.totalUsers = data.totalUsers;
    this.averagePrice = data.averagePrice;
  }
}
