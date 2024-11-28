import { Injectable } from '@nestjs/common';

import { LoginReqDto } from '../models/dto/req/login.req.dto';
import { RegisterReqDto } from '../models/dto/req/registe.req.dto';
import { TokenPair } from '../models/interfaces/token-pair.interface';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(private readonly tokenService: TokenService) {}

  async register(data: RegisterReqDto): Promise<TokenPair> {
    // Регистрация пользователя
    return this.tokenService.generateTokens({ userId: '1', email: data.email });
  }

  async login(data: LoginReqDto): Promise<TokenPair> {
    // Аутентификация пользователя
    return this.tokenService.generateTokens({ userId: '1', email: data.email });
  }

  async refreshToken(refreshToken: string): Promise<TokenPair> {
    // Обновление токенов
    return this.tokenService.generateTokens({
      userId: '1',
      email: 'user@example.com',
    });
  }

  async logout(refreshToken: string): Promise<void> {
    // Логаут пользователя
  }

  async getMe() {
    // Возврат информации о текущем пользователе
    return { userId: '1', userName: 'John Doe', email: 'user@example.com' };
  }
}
