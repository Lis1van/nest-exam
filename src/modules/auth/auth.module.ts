import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { JwtStrategy } from 'src/common/strategies/jwt-stratege';
import { Role } from 'src/database/entities/role.entity';
import { User } from 'src/database/entities/user.entity';

import { RedisModule } from '../redis/redis.module';
import { RedisService } from '../redis/services/redis.service';
import { AuthController } from './auth.controller';
// import { JwtAuthGuard } from './models/guards/jwt-auth.guard';
import { AuthService } from './services/auth.service';
import { AuthCacheService } from './services/auth-cache.service';
import { TokenService } from './services/token.service';

@Module({
  controllers: [AuthController],
  imports: [TypeOrmModule.forFeature([User, Role]), RedisModule],
  providers: [
    AuthService,
    TokenService,
    AuthCacheService,
    JwtStrategy,
    JwtAuthGuard,
    RedisService,
    JwtService,
  ],
  exports: [JwtAuthGuard, AuthCacheService],
})
export class AuthModule {}
