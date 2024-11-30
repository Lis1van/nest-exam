import { Module } from '@nestjs/common';

import { UserRepository } from './services/user.repository';

@Module({
  providers: [UserRepository],
  exports: [UserRepository],
})
export class RepositoriesModule {}
