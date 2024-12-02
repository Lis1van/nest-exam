import { Body, Controller, Post } from '@nestjs/common';

import { LoginReqDto } from './models/dto/req/login.req.dto';
import { RegisterReqDto } from './models/dto/req/registe.req.dto';
import { AuthService } from './services/auth.service';
import { AuthCacheService } from './services/auth-cache.service';
import { TokenService } from './services/token.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    private readonly authCacheService: AuthCacheService,
  ) {}

  @Post('register')
  register(@Body() dto: RegisterReqDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginReqDto) {
    return this.authService.login(dto);
  }
}
