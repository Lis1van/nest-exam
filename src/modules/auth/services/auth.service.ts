// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import * as bcrypt from 'bcrypt';
// import { Repository } from 'typeorm';

// import { Role } from '../../../database/entities/role.entity';
// import { User } from '../../../database/entities/user.entity';
// import { LoginReqDto } from '../models/dto/req/login.req.dto';
// import { RegisterReqDto } from '../models/dto/req/registe.req.dto';
// import { AuthResDto } from '../models/dto/res/auth.res.dto';
// import { TokenPairResDto } from '../models/dto/res/token-pair.res.dto';
// import { AuthCacheService } from './auth-cache.service';
// import { TokenService } from './token.service';

// @Injectable()
// export class AuthService {
//   private readonly saltRounds = 10;

//   constructor(
//     private readonly tokenService: TokenService,
//     private readonly authCacheService: AuthCacheService,
//     @InjectRepository(User)
//     private readonly userRepository: Repository<User>,
//     @InjectRepository(Role)
//     private readonly roleRepository: Repository<Role>,
//   ) {}

//   async register(data: RegisterReqDto): Promise<TokenPairResDto & AuthResDto> {
//     console.log('Starting registration for', data.email);

//     try {
//       const hashedPassword = await bcrypt.hash(data.password, this.saltRounds);
//       console.log('Password successfully hashed for', data.email);

//       const role = await this.roleRepository.findOne({
//         where: { name: data.role || 'user' },
//       });

//       if (!role) {
//         console.error('Role not found for:', data.role);
//         throw new Error('Role not found');
//       }
//       console.log('Role found:', role);

//       const newUser = this.userRepository.create({
//         email: data.email,
//         password: hashedPassword,
//         name: data.name,
//         role,
//       });

//       await this.userRepository.save(newUser);
//       console.log('User created and saved:', newUser);

//       const tokens = this.tokenService.generateTokens({
//         userId: newUser.id,
//         email: newUser.email,
//         role: String(newUser.role.name),
//       });
//       console.log('Tokens generated for user:', newUser.email);

//       await this.authCacheService.saveToken(newUser.id, tokens.refreshToken);
//       console.log('Refresh token saved for user:', newUser.id);

//       return {
//         ...tokens,
//         userId: newUser.id,
//         userName: newUser.name,
//         email: newUser.email,
//       };
//     } catch (error) {
//       console.error('Error during registration:', error.message);
//       throw error; // rethrow the error after logging it
//     }
//   }

//   async login(data: LoginReqDto): Promise<TokenPairResDto & AuthResDto> {
//     console.log('Starting login for email:', data.email);

//     try {
//       const user = await this.userRepository.findOne({
//         where: { email: data.email },
//         relations: ['role'],
//       });

//       if (!user) {
//         console.error('Login failed - user not found for email:', data.email);
//         throw new Error('Invalid email or password.');
//       }
//       console.log('User found:', user.email);

//       const isPasswordValid = await bcrypt.compare(
//         data.password,
//         user.password,
//       );
//       if (!isPasswordValid) {
//         console.error('Login failed - invalid password for email:', data.email);
//         throw new Error('Invalid email or password.');
//       }
//       console.log('Password is valid for user:', user.email);

//       const existingRefreshToken = await this.authCacheService.getToken(
//         user.id,
//       );
//       if (!existingRefreshToken) {
//         console.error(
//           'User cannot login, refresh token not found for ID:',
//           user.id,
//         );
//         throw new Error('User cannot login, refresh token not found.');
//       }

//       const tokens = this.tokenService.generateTokens({
//         userId: user.id,
//         email: user.email,
//         role: user.role.name,
//       });
//       console.log('Tokens generated for user:', user.email);

//       await this.authCacheService.saveToken(user.id, tokens.refreshToken);
//       console.log('Refresh token saved for user:', user.id);

//       return {
//         ...tokens,
//         userId: user.id,
//         userName: user.name,
//         email: user.email,
//       };
//     } catch (error) {
//       console.error('Error during login:', error.message);
//       throw error; // rethrow the error after logging it
//     }
//   }

//   async refreshToken(
//     refreshToken: string,
//   ): Promise<TokenPairResDto & AuthResDto> {
//     console.log('Refreshing token for refresh token:', refreshToken);

//     try {
//       // Проверяем refresh токен
//       const payload = this.tokenService.verifyRefreshToken(refreshToken);
//       console.log('Refresh token verified for payload:', payload);

//       // Ищем пользователя в кэше по токену
//       const userId = await this.authCacheService.getUserIdByToken(refreshToken);
//       if (!userId) {
//         console.error('Refresh token not found in cache:', refreshToken);
//         throw new Error('Refresh token mismatch.');
//       }

//       // Генерируем новые токены
//       const newTokens = this.tokenService.generateTokens(payload);
//       await this.authCacheService.saveToken(userId, newTokens.refreshToken);
//       console.log('New tokens generated and saved for user ID:', userId);

//       // Получаем пользователя для ответа
//       const user = await this.userRepository.findOne({
//         where: { id: userId },
//         relations: ['role'],
//       });

//       if (!user) {
//         console.error('User not found for ID:', userId);
//         throw new Error('User not found.');
//       }

//       return {
//         ...newTokens,
//         userId: user.id,
//         userName: user.name,
//         email: user.email,
//       };
//     } catch (error) {
//       console.error('Error during token refresh:', error.message);
//       throw error;
//     }
//   }

//   async logout(refreshToken: string): Promise<void> {
//     console.log('Logging out with refresh token:', refreshToken);

//     try {
//       const userId = await this.authCacheService.getUserIdByToken(refreshToken);
//       if (!userId) {
//         console.error('Logout failed - token not found:', refreshToken);
//         throw new Error('Invalid refresh token.');
//       }

//       await this.authCacheService.removeToken(userId);
//       console.log('User successfully logged out:', userId);
//     } catch (error) {
//       console.error('Error during logout:', error.message);
//       throw error;
//     }
//   }
// }

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { Role } from '../../../database/entities/role.entity';
import { User } from '../../../database/entities/user.entity';
import { LoginReqDto } from '../models/dto/req/login.req.dto';
import { RegisterReqDto } from '../models/dto/req/registe.req.dto';
import { AuthResDto } from '../models/dto/res/auth.res.dto';
import { TokenPairResDto } from '../models/dto/res/token-pair.res.dto';
import { AuthCacheService } from './auth-cache.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  private readonly saltRounds = 10;

  constructor(
    private readonly tokenService: TokenService,
    private readonly authCacheService: AuthCacheService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  // async register(data: RegisterReqDto): Promise<TokenPairResDto & AuthResDto> {
  //   const hashedPassword = await bcrypt.hash(data.password, this.saltRounds);

  //   const role = await this.roleRepository.findOne({
  //     where: { name: data.role || 'user' },
  //   });

  //   if (!role) {
  //     throw new Error('Role not found');
  //   }

  //   const user = this.userRepository.create({
  //     email: data.email,
  //     password: hashedPassword,
  //     role,
  //     name: data.name,
  //   });

  //   await this.userRepository.save(user);

  //   const { accessToken, refreshToken } =
  //     await this.tokenService.generateTokens(user);
  //   await this.authCacheService.saveToken(user.id, refreshToken);

  //   return {
  //     accessToken,
  //     refreshToken,
  //     userId: user.id,
  //     userName: user.name,
  //     email: user.email,
  //   };
  // }

  // async login(data: LoginReqDto): Promise<TokenPairResDto & AuthResDto> {
  //   const user = await this.userRepository.findOne({
  //     where: { email: data.email },
  //   });

  //   if (!user || !(await bcrypt.compare(data.password, user.password))) {
  //     throw new Error('Invalid credentials');
  //   }

  //   const { accessToken, refreshToken } =
  //     await this.tokenService.generateTokens(user);
  //   await this.authCacheService.saveToken(user.id, refreshToken);

  //   return {
  //     accessToken,
  //     refreshToken,
  //     userId: user.id,
  //     userName: user.name,
  //     email: user.email,
  //   };
  // }
  async register(data: RegisterReqDto): Promise<TokenPairResDto & AuthResDto> {
    const hashedPassword = await bcrypt.hash(data.password, this.saltRounds);

    const role = await this.roleRepository.findOne({
      where: { name: data.role || 'user' },
    });

    if (!role) {
      throw new Error('Role not found');
    }

    const user = this.userRepository.create({
      email: data.email,
      password: hashedPassword,
      role,
      name: data.name,
    });

    await this.userRepository.save(user);

    // Преобразуем объект user в объект JwtPayload
    const jwtPayload = {
      userId: user.id,
      email: user.email, // добавляем email
      role: user.role.name, // добавляем роль
    };

    const { accessToken, refreshToken } =
      await this.tokenService.generateTokens(jwtPayload);
    await this.authCacheService.saveToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
      userId: user.id,
      userName: user.name,
      email: user.email,
    };
  }

  async login(data: LoginReqDto): Promise<TokenPairResDto & AuthResDto> {
    const user = await this.userRepository.findOne({
      where: { email: data.email },
      relations: ['role'], // Загружаем роль вместе с пользователем
    });

    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new Error('Invalid credentials');
    }

    // Преобразуем объект user в объект JwtPayload
    const jwtPayload = {
      userId: user.id,
      email: user.email, // добавляем email
      role: user.role.name, // добавляем роль
    };

    const { accessToken, refreshToken } =
      await this.tokenService.generateTokens(jwtPayload);
    await this.authCacheService.saveToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
      userId: user.id,
      userName: user.name,
      email: user.email,
    };
  }
}
