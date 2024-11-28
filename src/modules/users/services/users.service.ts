import { Injectable } from '@nestjs/common';

import { CreateUserReqDto } from '../models/dto/req/create-user.req.dto';
import { UpdateUserReqDto } from '../models/dto/req/update-user.req.dto';
import { UpgradeAccountReqDto } from '../models/dto/req/upgrade-account.req.dto';
import { User } from '../models/interfaces/user.interface';

@Injectable()
export class UserService {
  private users: User[] = [];

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }

  async createUser(createUserDto: CreateUserReqDto): Promise<User> {
    const newUser: User = {
      id: String(this.users.length + 1),
      name: createUserDto.name,
      email: createUserDto.email,
      accountType: 'basic',
    };
    this.users.push(newUser);
    return newUser;
  }

  async getUserById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }

  async updateUser(id: string, updateUserDto: UpdateUserReqDto): Promise<User> {
    const user = await this.getUserById(id);
    if (user) {
      Object.assign(user, updateUserDto);
    }
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id);
  }

  async upgradeAccount(upgradeAccountDto: UpgradeAccountReqDto): Promise<User> {
    const user = await this.getUserById(upgradeAccountDto.userId);
    if (user) {
      user.accountType = upgradeAccountDto.accountType;
    }
    return user;
  }
}
