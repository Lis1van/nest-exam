import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from 'src/configs/config.type';

import { CreateUserDto } from '../models/dto/req/create-user.req.dto';
import { UpdateUserDto } from '../models/dto/req/update-user.req.dto';
import { UserResDto } from '../models/dto/res/user.res.dto';

@Injectable()
export class UsersService {
  constructor(private readonly configService: ConfigService) {}
  public async create(createUserDto: CreateUserDto): Promise<UserResDto> {
    const appConfig = this.configService.get<AppConfig>('database');
    console.log(appConfig);
    return {} as UserResDto;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
