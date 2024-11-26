import { Module } from '@nestjs/common';

import { SwaggerSetupModule } from './documentations/swagger.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [UsersModule, SwaggerSetupModule],
})
export class AppModule {}
