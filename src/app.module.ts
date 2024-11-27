import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './configs/configuration';
import { SwaggerSetupModule } from './documentations/swagger.module';
import { AuthModule } from './modules/auth/auth.module';
import { AveragePricesModule } from './modules/average-prices/average-prices.module';
import { CarBrandsModule } from './modules/car-brands/car-brands.module';
import { CarModelsModule } from './modules/car-models/car-models.module';
import { HealthModule } from './modules/health/health.module';
import { ListingsModule } from './modules/listings/listings.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { RedisModule } from './modules/redis/redis.module';
import { RolesModule } from './modules/roles/roles.module';
import { StatisticsModule } from './modules/statistics/statistics.module';
import { TypeOrmPostgresModule } from './modules/type-orm/type-orm.module';
import { UsersModule } from './modules/users/users.module';
import { ViewsStatisticsModule } from './modules/views-statistics/views-statistics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmPostgresModule,
    SwaggerSetupModule,
    RedisModule,

    UsersModule,
    AuthModule,
    AveragePricesModule,
    CarBrandsModule,
    CarModelsModule,
    ListingsModule,
    PermissionsModule,
    RolesModule,
    StatisticsModule,
    ViewsStatisticsModule,
    HealthModule,
  ],
})
export class AppModule {}
