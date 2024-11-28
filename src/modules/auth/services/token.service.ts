import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { JwtPayload } from '../models/interfaces/jwt-payload.interface';
import { TokenPair } from '../models/interfaces/token-pair.interface';

@Injectable()
export class TokenService {
  private readonly accessTokenSecret = 'ACCESS_SECRET'; // Лучше использовать process.env
  private readonly refreshTokenSecret = 'REFRESH_SECRET';

  generateTokens(payload: JwtPayload): TokenPair {
    const accessToken = jwt.sign(payload, this.accessTokenSecret, {
      expiresIn: '15m',
    });
    const refreshToken = jwt.sign(payload, this.refreshTokenSecret, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  verifyRefreshToken(token: string): JwtPayload {
    try {
      return jwt.verify(token, this.refreshTokenSecret) as JwtPayload;
    } catch (err) {
      throw new Error('Неверный refresh токен');
    }
  }
}
