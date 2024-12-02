import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { PostgresConfig } from 'src/configs/config.type';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const config = configService.get<PostgresConfig>('postgres');
        return {
          type: 'postgres',
          host: config.host,
          port: config.port,
          username: config.username,
          password: config.password,
          database: config.database,
          entities: [
            path.join(
              process.cwd(),
              'dist',
              'src',
              'database',
              'entities',
              '*.entity.js', // Путь до всех сущностей
            ),
          ],
          migrations: [
            path.join(
              process.cwd(),
              'dist',
              'src',
              'database',
              'migrations',
              '*.js', // Путь до всех миграций
            ),
          ],
          synchronize: false,
          migrationsRun: true,
          logging: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class TypeOrmPostgresModule {}
