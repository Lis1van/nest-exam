import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { SwaggerSetupModule } from './documentations/swagger.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  SwaggerSetupModule.setupSwagger(app);

  await app.listen(3000);
}
bootstrap();
