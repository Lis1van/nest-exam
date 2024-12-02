import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './configs/configuration';
import { SwaggerSetupModule } from './documentations/swagger.module';
import { AuthModule } from './modules/auth/auth.module';
import { AveragePriceModule } from './modules/average-prices/average-prices.module';
import { CarBrandModule } from './modules/car-brands/car-brands.module';
import { CarModelModule } from './modules/car-models/car-models.module';
import { ExchangeRateModule } from './modules/exchange-rate/exchange-rate.module';
import { HealthModule } from './modules/health/health.module';
import { ListingsModule } from './modules/listings/listings.module';
import { MailerModule } from './modules/mailer/mailer.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { RedisModule } from './modules/redis/redis.module';
import { RoleModule } from './modules/roles/roles.module';
import { StatisticsModule } from './modules/statistics/statistics.module';
import { TypeOrmPostgresModule } from './modules/type-orm/type-orm.module';
import { UserModule } from './modules/users/users.module';
import { ViewStatisticsModule } from './modules/views-statistics/views-statistics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmPostgresModule,
    SwaggerSetupModule,
    RedisModule,

    UserModule,
    AuthModule,
    AveragePriceModule,
    CarBrandModule,
    CarModelModule,
    ListingsModule,
    PermissionsModule,
    RoleModule,
    StatisticsModule,
    ViewStatisticsModule,
    HealthModule,
    ExchangeRateModule,
    MailerModule,
  ],
})
export class AppModule {}
