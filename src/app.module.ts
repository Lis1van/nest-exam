import { Module } from '@nestjs/common';

import { SwaggerSetupModule } from './documentations/swagger.module';
import { AuthModule } from './modules/auth/auth.module';
import { AveragePricesModule } from './modules/average-prices/average-prices.module';
import { CarBrandsModule } from './modules/car-brands/car-brands.module';
import { CarModelsModule } from './modules/car-models/car-models.module';
import { ListingsModule } from './modules/listings/listings.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { RolesModule } from './modules/roles/roles.module';
import { StatisticsModule } from './modules/statistics/statistics.module';
import { UsersModule } from './modules/users/users.module';
import { ViewsStatisticsModule } from './modules/views-statistics/views-statistics.module';

@Module({
  imports: [
    UsersModule,
    SwaggerSetupModule,
    AuthModule,
    AveragePricesModule,
    CarBrandsModule,
    CarModelsModule,
    ListingsModule,
    PermissionsModule,
    RolesModule,
    StatisticsModule,
    ViewsStatisticsModule,
  ],
})
export class AppModule {}
