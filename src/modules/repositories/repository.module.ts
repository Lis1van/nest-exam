import { Module } from '@nestjs/common';

import { RoleRepository } from './services/role.repository';
import { UserRepository } from './services/user.repository';

@Module({
  providers: [UserRepository, RoleRepository],
  exports: [UserRepository, RoleRepository],
})
export class RepositoriesModule {}
