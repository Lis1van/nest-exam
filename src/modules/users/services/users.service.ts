import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../../database/entities/user.entity';
import { UpdateUserReqDto } from '../models/dto/req/update-user.req.dto';
import { UpgradeAccountReqDto } from '../models/dto/req/upgrade-account.req.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserReqDto): Promise<User> {
    const user = await this.getUserById(id);
    const updatedUser = { ...user, ...updateUserDto };
    return await this.userRepository.save(updatedUser);
  }

  async upgradeAccount(
    id: string,
    upgradeAccountDto: UpgradeAccountReqDto,
  ): Promise<User> {
    const user = await this.getUserById(id);
    user.accountType = upgradeAccountDto.accountType;
    return await this.userRepository.save(user);
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}
