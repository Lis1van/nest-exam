import { Module } from '@nestjs/common';

import { PermissionsController } from './permissions.controller';
import { PermissionCacheService } from './services/permission-cache.service';
import { PermissionService } from './services/permissions.service';

@Module({
  controllers: [PermissionsController],
  providers: [PermissionService, PermissionCacheService],
})
export class PermissionsModule {}
