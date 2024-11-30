// user.repository.ts

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { User } from '../../../database/entities/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  async createUser(userData: Partial<User>): Promise<User> {
    const user = this.create(userData);
    return await this.save(user);
  }
}
