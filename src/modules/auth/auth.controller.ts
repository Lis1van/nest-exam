import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { LoginReqDto } from './models/dto/req/login.req.dto';
import { RegisterReqDto } from './models/dto/req/registe.req.dto';
import { AuthService } from './services/auth.service';
import { AuthCacheService } from './services/auth-cache.service';
import { TokenService } from './services/token.service';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    private readonly authCacheService: AuthCacheService,
  ) {}

  @ApiOperation({
    summary: 'Регистрация',
    description: 'Регистрация пользователя',
  })
  @Post('register')
  register(@Body() dto: RegisterReqDto) {
    return this.authService.register(dto);
  }

  @ApiOperation({
    summary: 'Авторизация',
    description: 'Авторизация пользователя',
  })
  @Post('login')
  login(@Body() dto: LoginReqDto) {
    return this.authService.login(dto);
  }
}
