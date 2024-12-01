// import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';
// import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

// import { LoginReqDto } from './models/dto/req/login.req.dto';
// import { RegisterReqDto } from './models/dto/req/registe.req.dto';
// import { AuthService } from './services/auth.service';
// import { AuthCacheService } from './services/auth-cache.service';
// import { TokenService } from './services/token.service';

// @Controller('auth')
// export class AuthController {
//   constructor(
//     private readonly authService: AuthService,
//     private readonly tokenService: TokenService,
//     private readonly authCacheService: AuthCacheService,
//   ) {}

//   @Post('register')
//   register(@Body() dto: RegisterReqDto) {
//     return this.authService.register(dto);
//   }

//   @Post('login')
//   login(@Body() dto: LoginReqDto) {
//     return this.authService.login(dto);
//   }

//   @Post('refresh')
//   async refreshTokens(@Headers('authorization') authHeader: string) {
//     const token = authHeader?.split(' ')[1];
//     if (!token) {
//       throw new Error('Рефреш-токен отсутствует.');
//     }

//     const payload = this.tokenService.verifyRefreshToken(token);

//     const storedToken = await this.authCacheService.getToken(payload.userId);
//     if (storedToken !== token) {
//       throw new Error('Рефреш-токен недействителен.');
//     }

//     const newTokens = this.tokenService.generateTokens(payload);

//     await this.authCacheService.saveToken(
//       payload.userId,
//       newTokens.refreshToken,
//     );

//     return newTokens;
//   }

//   @UseGuards(JwtAuthGuard)
//   @Post('logout')
//   async logout(
//     @Body('refreshToken') refreshToken: string,
//   ): Promise<{ message: string }> {
//     await this.authService.logout(refreshToken);
//     return { message: 'Вы успешно вышли' };
//   }
// }

import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

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

  // @Post('refresh')
  // async refreshTokens(@Headers('authorization') authHeader: string) {
  //   const token = authHeader?.split(' ')[1];
  //   if (!token) {
  //     throw new Error('Рефреш-токен отсутствует.');
  //   }

  //   const payload = this.tokenService.verifyRefreshToken(token);

  //   const storedToken = await this.authCacheService.getToken(payload.userId);
  //   if (storedToken !== token) {
  //     throw new Error('Рефреш-токен недействителен.');
  //   }

  //   const newTokens = this.tokenService.generateTokens(payload);

  //   await this.authCacheService.saveToken(
  //     payload.userId,
  //     newTokens.refreshToken,
  //   );

  //   return newTokens;
  // }

  // @UseGuards(JwtAuthGuard)
  // @Post('logout')
  // async logout(
  //   @Body('refreshToken') refreshToken: string,
  // ): Promise<{ message: string }> {
  //   await this.authService.logout(refreshToken);
  //   return { message: 'Вы успешно вышли' };
  // }
}
