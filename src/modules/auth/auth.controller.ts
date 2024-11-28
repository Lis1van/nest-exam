import { Body, Controller, Get, Post } from '@nestjs/common';

import { LoginReqDto } from './models/dto/req/login.req.dto';
import { RegisterReqDto } from './models/dto/req/registe.req.dto';
import { TokenPairResDto } from './models/dto/res/token-pair.res.dto';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterReqDto): Promise<TokenPairResDto> {
    return await this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginReqDto): Promise<TokenPairResDto> {
    return await this.authService.login(dto);
  }

  @Post('refresh-token')
  async refreshToken(
    @Body('refreshToken') refreshToken: string,
  ): Promise<TokenPairResDto> {
    return await this.authService.refreshToken(refreshToken);
  }

  @Post('logout')
  async logout(@Body('refreshToken') refreshToken: string): Promise<void> {
    return await this.authService.logout(refreshToken);
  }

  @Get('me')
  async getMe() {
    return await this.authService.getMe();
  }
}
