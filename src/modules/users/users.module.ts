import { Module } from '@nestjs/common';

import { RoleModule } from '../roles/roles.module';
import { UserCacheService } from './services/user-cache.service';
import { UserService } from './services/users.service';
import { UserController } from './users.controller';

@Module({
  imports: [RoleModule],
  controllers: [UserController],
  providers: [UserService, UserCacheService],
})
export class UserModule {}
