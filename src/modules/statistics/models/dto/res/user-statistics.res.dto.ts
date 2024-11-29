export class UserStatisticsResDto {
  userId: string; // ID пользователя
  totalListings: number; // Общее количество объявлений пользователя
  totalViews: number; // Общее количество просмотров объявлений
  averagePrice: number; // Средняя цена объявлений пользователя

  constructor(data: Partial<UserStatisticsResDto>) {
    this.userId = data.userId;
    this.totalListings = data.totalListings;
    this.totalViews = data.totalViews;
    this.averagePrice = data.averagePrice;
  }
}
