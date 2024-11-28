import { Module } from '@nestjs/common';

import { UserCacheService } from './services/user-cache.service';
import { UserService } from './services/users.service';
import { UserController } from './users.controller';

@Module({
  controllers: [UserController],
  providers: [UserService, UserCacheService],
})
export class UserModule {}
