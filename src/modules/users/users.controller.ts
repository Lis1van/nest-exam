import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UpdateUserReqDto } from './models/dto/req/update-user.req.dto';
import { UpgradeAccountReqDto } from './models/dto/req/upgrade-account.req.dto';
import { UserResDto } from './models/dto/res/user.res.dto';
import { UserService } from './services/users.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<UserResDto[]> {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserResDto> {
    return await this.userService.getUserById(id);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserReqDto,
  ): Promise<UserResDto> {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Patch(':id/upgrade')
  async upgradeAccount(
    @Param('id') id: string,
    @Body() upgradeAccountDto: UpgradeAccountReqDto,
  ): Promise<UserResDto> {
    return await this.userService.upgradeAccount(id, upgradeAccountDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return await this.userService.deleteUser(id);
  }
}
