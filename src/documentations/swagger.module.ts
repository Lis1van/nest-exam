import { INestApplication, Module } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';

import { swaggerConfig } from './swagger.config';
import { SwaggerHelper } from './swagger.helper';

@Module({})
export class SwaggerSetupModule {
  static setupSwagger(app: INestApplication) {
    const config = swaggerConfig(); // Используем конфигурацию
    const document = SwaggerModule.createDocument(app, config);
    SwaggerHelper.setDefaultResponses(document);
    SwaggerModule.setup('docs', app, document, {
      swaggerOptions: {
        docExpansion: 'list',
        defaultModelsExpandDepth: 1,
        persistAuthorization: true,
      },
    });
  }
}
