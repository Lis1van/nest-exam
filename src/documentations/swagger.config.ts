import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = () => {
  return new DocumentBuilder()
    .setTitle('AutoRia Clone API')
    .setDescription(
      'Документация для API, предназначенного для управления пользователями, ' +
        'объявлениями автомобилей и их статистикой. Этот API позволяет пользователям регистрироваться, ' +
        'аутентифицироваться, создавать, обновлять и удалять объявления, ' +
        'а также управлять ролями и правами доступа.',
    )
    .setVersion('1.0')
    .addBearerAuth({
      in: 'header',
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();
};
