import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { AppConfig } from './configs/config.type';
import { SwaggerSetupModule } from './documentations/swagger.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Получаем конфигурацию
  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfig>('app');

  SwaggerSetupModule.setupSwagger(app);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Удаляет поля, не указанные в DTO
      forbidNonWhitelisted: true, // Запрещает запросы с неуказанными в DTO полями
      transform: true, // Автоматически преобразует типы данных
    }),
  );

  // Запускаем сервер
  await app.listen(appConfig.port, () => {
    console.log(
      `Server is running on http://${appConfig.host}:${appConfig.port}`,
    );
    console.log(
      `Swagger is running on http://${appConfig.host}:${appConfig.port}/docs`,
    );
  });
}
bootstrap();
