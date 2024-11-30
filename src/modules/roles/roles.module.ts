import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/database/entities/role.entity';

import { RoleRepository } from '../repositories/services/role.repository';
import { RoleController } from './roles.controller';
import { RoleCacheService } from './services/role-cache.service';
import { RoleService } from './services/roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RoleController],
  providers: [RoleService, RoleCacheService, RoleRepository],
})
export class RoleModule {}
