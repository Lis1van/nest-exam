import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateUserReqDto } from './models/dto/req/create-user.req.dto';
import { UpdateUserReqDto } from './models/dto/req/update-user.req.dto';
import { UpgradeAccountReqDto } from './models/dto/req/upgrade-account.req.dto';
import { UserResDto } from './models/dto/res/user.res.dto';
import { UserService } from './services/users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<UserResDto[]> {
    return await this.userService.getAllUsers();
  }

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserReqDto,
  ): Promise<UserResDto> {
    return await this.userService.createUser(createUserDto);
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

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return await this.userService.deleteUser(id);
  }

  @Post('upgrade-account')
  async upgradeAccount(
    @Body() upgradeAccountDto: UpgradeAccountReqDto,
  ): Promise<UserResDto> {
    return await this.userService.upgradeAccount(upgradeAccountDto);
  }
}
