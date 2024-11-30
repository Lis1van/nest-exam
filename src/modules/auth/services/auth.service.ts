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

  // async register(data: RegisterReqDto): Promise<TokenPair> {
  //   const hashedPassword = await bcrypt.hash(data.password, this.saltRounds);

  //   const role = await this.roleRepository.findOne({
  //     where: { name: data.role || 'users' },
  //   });

  //   if (!role) {
  //     throw new Error('Указанная роль не найдена.');
  //   }

  //   const newUser = this.userRepository.create({
  //     email: data.email,
  //     password: hashedPassword,
  //     role,
  //     name: data.name,
  //   });

  //   await this.userRepository.save(newUser);

  //   const tokens = this.tokenService.generateTokens({
  //     userId: newUser.id,
  //     email: newUser.email,
  //     role: role.name,
  //   });

  //   await this.authCacheService.saveToken(newUser.id, tokens.refreshToken);

  //   return tokens;
  // }
  async register(data: RegisterReqDto): Promise<TokenPair> {
    console.log('Начало регистрации', data);

    const hashedPassword = await bcrypt.hash(data.password, this.saltRounds);
    console.log('Пароль успешно захэширован');

    const role = await this.roleRepository.findOne({
      where: { name: data.role || 'user' },
    });
    if (!role) {
      console.log('Роль не найдена');
      throw new Error('Роль не найдена');
    }
    console.log('Роль найдена', role);

    const newUser = this.userRepository.create({
      email: data.email,
      password: hashedPassword,
      role,
    });
    console.log('Пользователь создан', newUser);

    await this.userRepository.save(newUser);
    console.log('Пользователь сохранён в базе данных');

    const tokens = this.tokenService.generateTokens({
      userId: newUser.id,
      email: newUser.email,
      role: String(newUser.role.name),
    });
    console.log('Токены сгенерированы', tokens);

    await this.authCacheService.saveToken(newUser.id, tokens.refreshToken);
    console.log('Токены сохранены в Redis');

    return tokens;
  }

  async login(data: LoginReqDto): Promise<TokenPair> {
    const user = await this.userRepository.findOne({
      where: { email: data.email },
      relations: ['role'],
    });

    if (!user) {
      throw new Error('Неверный email или пароль.');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Неверный email или пароль.');
    }

    const existingRefreshToken = await this.authCacheService.getToken(user.id);
    if (!existingRefreshToken) {
      throw new Error(
        'Пользователь не может войти, так как не найден refresh-токен.',
      );
    }

    const tokens = this.tokenService.generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role.name,
    });

    await this.authCacheService.saveToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async refreshToken(userId: string, refreshToken: string): Promise<TokenPair> {
    const savedToken = await this.authCacheService.getToken(userId);

    if (savedToken !== refreshToken) {
      throw new Error('Refresh-токен не совпадает.');
    }

    const payload = this.tokenService.verifyRefreshToken(refreshToken);

    if (payload.userId !== userId) {
      throw new Error('Неверный refresh-токен.');
    }

    const newTokens = this.tokenService.generateTokens(payload);

    await this.authCacheService.saveToken(userId, newTokens.refreshToken);

    return newTokens;
  }

  async logout(userId: string): Promise<void> {
    await this.authCacheService.removeToken(userId);
  }
}
