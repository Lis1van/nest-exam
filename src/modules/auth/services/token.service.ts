import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { JwtPayload } from '../models/interfaces/jwt-payload.interface';
import { TokenPair } from '../models/interfaces/token-pair.interface';

@Injectable()
export class TokenService {
  private readonly accessTokenSecret =
    process.env.JWT_ACCESS_SECRET || 'ACCESS_SECRET';
  private readonly refreshTokenSecret =
    process.env.JWT_REFRESH_SECRET || 'REFRESH_SECRET';

  generateTokens(payload: JwtPayload): TokenPair {
    const accessToken = jwt.sign(payload, this.accessTokenSecret, {
      expiresIn: '15m',
    });
    const refreshToken = jwt.sign(payload, this.refreshTokenSecret, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  verifyAccessToken(token: string): JwtPayload {
    return jwt.verify(token, this.accessTokenSecret) as JwtPayload;
  }

  verifyRefreshToken(token: string): JwtPayload {
    return jwt.verify(token, this.refreshTokenSecret) as JwtPayload;
  }
}
