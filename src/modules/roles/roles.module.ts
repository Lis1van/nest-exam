import { Module } from '@nestjs/common';

import { RoleController } from './roles.controller';
import { RoleCacheService } from './services/role-cache.service';
import { RoleService } from './services/roles.service';

@Module({
  controllers: [RoleController],
  providers: [RoleService, RoleCacheService],
})
export class RoleModule {}
