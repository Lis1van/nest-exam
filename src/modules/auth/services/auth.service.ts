import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
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

  async register(data: RegisterReqDto): Promise<TokenPairResDto & AuthResDto> {
    const hashedPassword = await bcrypt.hash(data.password, this.saltRounds);

    const role = await this.roleRepository.findOne({
      where: { name: data.role || 'user' },
    });

    if (!role) {
      throw new Error('Роль не найдена');
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
      throw new Error('Не верный email или пароль');
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
