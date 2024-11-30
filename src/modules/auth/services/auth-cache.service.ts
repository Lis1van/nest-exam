import { Injectable } from '@nestjs/common';

import { RedisService } from '../../redis/services/redis.service';

@Injectable()
export class AuthCacheService {
  constructor(private readonly redisService: RedisService) {}

  async saveToken(userId: string, refreshToken: string): Promise<void> {
    const client = this.redisService.getClient();
    await client.set(userId, refreshToken, 'EX', 7 * 24 * 60 * 60); // Refresh токен живет 7 дней
  }

  async getToken(userId: string): Promise<string | null> {
    const client = this.redisService.getClient();
    return await client.get(userId);
  }

  async removeToken(userId: string): Promise<void> {
    const client = this.redisService.getClient();
    await client.del(userId);
  }
}
