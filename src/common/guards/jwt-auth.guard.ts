import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  // canActivate(context: ExecutionContext): boolean {
  //   const request = context.switchToHttp().getRequest();
  //   const token = request.headers.authorization?.split(' ')[1];

  //   if (!token) {
  //     throw new Error('Требуется авторизация.');
  //   }

  //   try {
  //     const payload = this.jwtService.verify(token, {
  //       secret: process.env.JWT_SECRET,
  //     });
  //     request.user = payload;
  //     return true;
  //   } catch (error) {
  //     throw new Error('Неверный токен.');
  //   }
  // }
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (
      !request.headers.authorization ||
      !request.headers.authorization.startsWith('Bearer ')
    ) {
      throw new Error(
        'Заголовок Authorization отсутствует или имеет неверный формат.',
      );
    }

    if (!token) {
      throw new Error('Требуется авторизация.');
    }

    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET, // Для рефреша используем отдельный ключ
      });

      request.user = payload; // Привязываем пользователя к запросу
      return true;
    } catch (error) {
      throw new Error('Неверный токен или истек срок действия.');
    }
  }
}
