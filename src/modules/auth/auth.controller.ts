import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

import { LoginReqDto } from './models/dto/req/login.req.dto';
import { RegisterReqDto } from './models/dto/req/registe.req.dto';
// import { JwtAuthGuard } from './models/guards/jwt-auth.guard';
import { AuthService } from './services/auth.service';

@Controller('auth')
// @UseGuards(JwtAuthGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterReqDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginReqDto) {
    return this.authService.login(dto);
  }

  @Post('refresh')
  refresh(
    @Body('refreshToken') refreshToken: string,
    @Body('userId') userId: string,
  ) {
    return this.authService.refreshToken(userId, refreshToken);
  }

  @UseGuards(JwtAuthGuard) // Защита, чтобы только аутентифицированные пользователи могли вызывать logout
  @Post('logout')
  async logout(@Req() req): Promise<{ message: string }> {
    const userId = req.user.userId; // userId из JWT токена (должен быть частью payload)
    await this.authService.logout(userId);
    return { message: 'Вы успешно вышли' };
  }
}
