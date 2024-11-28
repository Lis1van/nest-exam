import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { AuthCacheService } from './services/auth-cache.service';
import { TokenService } from './services/token.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, TokenService, AuthCacheService],
})
export class AuthModule {}
