// import { Injectable } from '@nestjs/common';
// import * as bcrypt from 'bcrypt';

// import { LoginReqDto } from '../models/dto/req/login.req.dto';
// import { RegisterReqDto } from '../models/dto/req/registe.req.dto';
// import { TokenPair } from '../models/interfaces/token-pair.interface';
// import { AuthCacheService } from './auth-cache.service';
// import { TokenService } from './token.service';

// @Injectable()
// export class AuthService {
//   private readonly saltRounds = 10;

//   constructor(
//     private readonly tokenService: TokenService,
//     private readonly authCacheService: AuthCacheService, // Redis для токенов
//   ) {}

//   async register(data: RegisterReqDto): Promise<TokenPair> {
//     const hashedPassword = await bcrypt.hash(data.password, this.saltRounds);

//     // Создать пользователя (данные должны сохраняться в БД)
//     const newUser = {
//       id: 'new-generated-id', // Генерируется уникальный ID
//       email: data.email,
//       password: hashedPassword,
//       role: data.role || 'user',
//     };

//     const tokens = this.tokenService.generateTokens({
//       userId: newUser.id,
//       email: newUser.email,
//       role: newUser.role,
//     });

//     await this.authCacheService.saveToken(newUser.id, tokens.refreshToken); // Сохранение refresh-токена

//     return tokens;
//   }

//   async login(data: LoginReqDto): Promise<TokenPair> {
//     // Найти пользователя в БД
//     const user = {
//       id: 'existing-user-id',
//       email: data.email,
//       password: '$hashedPasswordFromDB',
//       role: 'user',
//     };

//     const isPasswordCorrect = await bcrypt.compare(
//       data.password,
//       user.password,
//     );
//     if (!isPasswordCorrect) {
//       throw new Error('Неверный пароль');
//     }

//     const tokens = this.tokenService.generateTokens({
//       userId: user.id,
//       email: user.email,
//       role: user.role,
//     });

//     await this.authCacheService.saveToken(user.id, tokens.refreshToken); // Сохранение refresh-токена

//     return tokens;
//   }

//   async refreshToken(userId: string, refreshToken: string): Promise<TokenPair> {
//     // Проверить refresh-токен
//     const payload = this.tokenService.verifyRefreshToken(refreshToken);

//     if (payload.userId !== userId) {
//       throw new Error('Неверный токен');
//     }

//     const tokens = this.tokenService.generateTokens(payload);

//     await this.authCacheService.saveToken(userId, tokens.refreshToken);

//     return tokens;
//   }

//   async logout(userId: string): Promise<void> {
//     // Удалить refresh-токен пользователя из Redis
//     await this.authCacheService.removeToken(userId);
//   }
// }

// auth.service.ts

// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import * as bcrypt from 'bcrypt';
// import { Repository } from 'typeorm';

// import { Role } from '../../../database/entities/role.entity'; // Импортируем сущность Role
// import { User } from '../../../database/entities/user.entity';
// import { LoginReqDto } from '../models/dto/req/login.req.dto';
// import { RegisterReqDto } from '../models/dto/req/registe.req.dto';
// import { TokenPair } from '../models/interfaces/token-pair.interface';
// import { AuthCacheService } from './auth-cache.service';
// import { TokenService } from './token.service';

// @Injectable()
// export class AuthService {
//   private readonly saltRounds = 10;

//   constructor(
//     private readonly tokenService: TokenService,
//     private readonly authCacheService: AuthCacheService, // Redis для токенов
//     @InjectRepository(User)
//     private readonly userRepository: Repository<User>, // Репозиторий для работы с User
//     @InjectRepository(Role)
//     private readonly roleRepository: Repository<Role>, // Репозиторий для работы с Role
//   ) {}

//   async register(data: RegisterReqDto): Promise<TokenPair> {
//     const hashedPassword = await bcrypt.hash(data.password, this.saltRounds);

//     // Получаем роль из базы данных или создаем дефолтную роль
//     const role = await this.roleRepository.findOne({
//       where: { name: data.role || 'user' }, // Название роли может быть 'user' или любая другая переданная роль
//     });

//     if (!role) {
//       throw new Error('Роль не найдена');
//     }

//     // Создаем нового пользователя с полученной ролью
//     const newUser = this.userRepository.create({
//       email: data.email,
//       password: hashedPassword,
//       role, // Передаем объект роли, а не строку
//     });

//     await this.userRepository.save(newUser);

//     const tokens = this.tokenService.generateTokens({
//       userId: newUser.id,
//       email: newUser.email,
//       role: String(newUser.role.name), // Преобразуем роль в строку (например, роль может быть 'user' или 'admin')
//     });

//     await this.authCacheService.saveToken(newUser.id, tokens.refreshToken); // Сохранение refresh-токена

//     return tokens;
//   }

//   async login(data: LoginReqDto): Promise<TokenPair> {
//     // Найти пользователя в БД
//     const user = await this.userRepository.findOne({
//       where: { email: data.email },
//       relations: ['role'], // Добавляем отношения для роли
//     });

//     if (!user) {
//       throw new Error('Пользователь не найден');
//     }

//     const isPasswordCorrect = await bcrypt.compare(
//       data.password,
//       user.password,
//     );
//     if (!isPasswordCorrect) {
//       throw new Error('Неверный пароль');
//     }

//     const tokens = this.tokenService.generateTokens({
//       userId: user.id,
//       email: user.email,
//       role: String(user.role.name), // Преобразуем роль в строку
//     });

//     await this.authCacheService.saveToken(user.id, tokens.refreshToken); // Сохранение refresh-токена

//     return tokens;
//   }

//   async refreshToken(userId: string, refreshToken: string): Promise<TokenPair> {
//     // Проверить refresh-токен
//     const payload = this.tokenService.verifyRefreshToken(refreshToken);

//     if (payload.userId !== userId) {
//       throw new Error('Неверный токен');
//     }

//     const tokens = this.tokenService.generateTokens(payload);

//     await this.authCacheService.saveToken(userId, tokens.refreshToken);

//     return tokens;
//   }

//   async logout(userId: string): Promise<void> {
//     // Удалить refresh-токен пользователя из Redis
//     await this.authCacheService.removeToken(userId);
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
import { TokenPair } from '../models/interfaces/token-pair.interface';
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

  async register(data: RegisterReqDto): Promise<TokenPair> {
    console.log('Start registration process', data);

    try {
      const hashedPassword = await bcrypt.hash(data.password, this.saltRounds);
      console.log('Password successfully hashed');

      const role = await this.roleRepository.findOne({
        where: { name: data.role || 'user' },
      });

      if (!role) {
        console.error('Role not found for:', data.role);
        throw new Error('Role not found');
      }
      console.log('Role found:', role);

      const newUser = this.userRepository.create({
        email: data.email,
        password: hashedPassword,
        name: data.name,
        role,
      });
      console.log('User created:', newUser);

      await this.userRepository.save(newUser);
      console.log('User saved to the database');

      // Генерация токенов
      const tokens = this.tokenService.generateTokens({
        userId: newUser.id,
        email: newUser.email,
        role: String(newUser.role.name),
      });
      console.log('Tokens generated:', tokens);

      // Сохранение refresh токена в Redis
      await this.authCacheService.saveToken(newUser.id, tokens.refreshToken);
      console.log('Tokens saved to Redis');

      return tokens;
    } catch (error) {
      console.error('Error during registration:', error.message);
      throw error; // rethrow the error after logging it
    }
  }

  async login(data: LoginReqDto): Promise<TokenPair> {
    console.log('Start login process for email:', data.email);

    try {
      const user = await this.userRepository.findOne({
        where: { email: data.email },
        relations: ['role'],
      });

      if (!user) {
        console.error('User not found for email:', data.email);
        throw new Error('Invalid email or password.');
      }

      const isPasswordValid = await bcrypt.compare(
        data.password,
        user.password,
      );
      if (!isPasswordValid) {
        console.error('Invalid password attempt for email:', data.email);
        throw new Error('Invalid email or password.');
      }

      // Получаем refresh token из Redis
      const existingRefreshToken = await this.authCacheService.getToken(
        user.id,
      );

      if (!existingRefreshToken) {
        console.error('No refresh token found for user ID:', user.id);
        throw new Error('User cannot login, refresh token not found.');
      }

      // Генерация новых токенов
      const tokens = this.tokenService.generateTokens({
        userId: user.id,
        email: user.email,
        role: user.role.name,
      });

      // Обновляем refresh token в Redis
      await this.authCacheService.saveToken(user.id, tokens.refreshToken);
      console.log('Login successful, tokens generated:', tokens);

      return tokens;
    } catch (error) {
      console.error('Error during login:', error.message);
      throw error; // rethrow the error after logging it
    }
  }

  async refreshToken(userId: string, refreshToken: string): Promise<TokenPair> {
    console.log('Start refreshing token for user ID:', userId);

    try {
      const savedToken = await this.authCacheService.getToken(userId);

      // Проверка на совпадение токенов
      if (savedToken !== refreshToken) {
        console.error('Refresh token does not match for user ID:', userId);
        throw new Error('Refresh token mismatch.');
      }

      // Верификация refresh токена
      const payload = this.tokenService.verifyRefreshToken(refreshToken);

      if (payload.userId !== userId) {
        console.error('Invalid refresh token for user ID:', userId);
        throw new Error('Invalid refresh token.');
      }

      // Генерация новых токенов
      const newTokens = this.tokenService.generateTokens(payload);
      await this.authCacheService.saveToken(userId, newTokens.refreshToken);

      console.log('Token refreshed successfully for user ID:', userId);
      return newTokens;
    } catch (error) {
      console.error('Error during token refresh:', error.message);
      throw error; // rethrow the error after logging it
    }
  }

  async logout(userId: string): Promise<void> {
    console.log('Start logout process for user ID:', userId);

    try {
      await this.authCacheService.removeToken(userId);
      console.log(
        'User successfully logged out, removed token for user ID:',
        userId,
      );
    } catch (error) {
      console.error('Error during logout:', error.message);
      throw error; // rethrow the error after logging it
    }
  }
}
