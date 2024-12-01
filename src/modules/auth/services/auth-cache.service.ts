// import { Injectable } from '@nestjs/common';
// import { RedisService } from 'src/modules/redis/services/redis.service';

// @Injectable()
// export class AuthCacheService {
//   constructor(private readonly redisService: RedisService) {}

//   async saveToken(userId: string, refreshToken: string): Promise<void> {
//     const client = this.redisService.getClient();
//     await client.set(`refreshToken:${refreshToken}`, userId);
//     await client.set(`userId:${userId}`, refreshToken);
//   }

//   async getToken(userId: string): Promise<string | null> {
//     const client = this.redisService.getClient();
//     return await client.get(`userId:${userId}`);
//   }

//   async getUserIdByToken(refreshToken: string): Promise<string | null> {
//     if (!refreshToken) {
//       throw new Error('Токен отсутствует.');
//     }

//     const client = this.redisService.getClient();
//     return await client.get(`refreshToken:${refreshToken}`);
//   }

//   async removeToken(userId: string): Promise<void> {
//     const client = this.redisService.getClient();

//     const refreshToken = await this.getToken(userId);
//     if (refreshToken) {
//       await client.del(`refreshToken:${refreshToken}`);
//     }
//     await client.del(`userId:${userId}`);
//   }
// }

import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/modules/redis/services/redis.service';

@Injectable()
export class AuthCacheService {
  constructor(private readonly redisService: RedisService) {}

  async saveToken(userId: string, refreshToken: string): Promise<void> {
    const client = this.redisService.getClient();
    await client.set(`refreshToken:${refreshToken}`, userId);
    await client.set(`userId:${userId}`, refreshToken);
  }

  async getToken(userId: string): Promise<string | null> {
    const client = this.redisService.getClient();
    return await client.get(`userId:${userId}`);
  }

  async getUserIdByToken(refreshToken: string): Promise<string | null> {
    if (!refreshToken) {
      throw new Error('Токен отсутствует.');
    }

    const client = this.redisService.getClient();
    return await client.get(`refreshToken:${refreshToken}`);
  }

  async removeToken(userId: string): Promise<void> {
    const client = this.redisService.getClient();

    const refreshToken = await this.getToken(userId);
    if (refreshToken) {
      await client.del(`refreshToken:${refreshToken}`);
    }
    await client.del(`userId:${userId}`);
  }
}
