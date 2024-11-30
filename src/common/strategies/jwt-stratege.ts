// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';

// import { ConfigType } from '../../configs/config.type';
// import { JwtPayload } from '../../modules/auth/models/interfaces/jwt-payload.interface';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(private configService: ConfigService<ConfigType>) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Извлекаем JWT токен из заголовка Authorization
//       ignoreExpiration: false, // Не игнорировать истечение срока действия
//       secretOrKey: configService.get<string>('jwt.secret'), // Используем секрет из конфигурации
//     });
//   }

//   // Валидируем payload, который мы извлекаем из токена
//   async validate(payload: JwtPayload) {
//     return { userId: payload.userId, email: payload.email };
//   }
// }

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ConfigType } from '../../configs/config.type';
import { JwtPayload } from '../../modules/auth/models/interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService<ConfigType>) {
    // Конфигурируем стратегию JWT
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Извлекаем JWT токен из заголовка Authorization
      ignoreExpiration: false, // Не игнорировать истечение срока действия
      // Получаем accessSecret из конфигурации
      secretOrKey: configService.get<ConfigType['jwt']>('jwt').accessSecret,
    });
  }

  // Валидируем payload, который мы извлекаем из токена
  async validate(payload: JwtPayload) {
    return { userId: payload.userId, email: payload.email }; // Возвращаем полезную информацию из payload
  }
}
