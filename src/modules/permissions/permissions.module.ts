import { Module } from '@nestjs/common';

import { PermissionsController } from './permissions.controller';
import { PermissionService } from './services/permissions.service';

@Module({
  controllers: [PermissionsController],
  providers: [PermissionService],
})
export class PermissionsModule {}
