import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { UpdateUserReqDto } from './models/dto/req/update-user.req.dto';
import { UpgradeAccountReqDto } from './models/dto/req/upgrade-account.req.dto';
import { UserResDto } from './models/dto/res/user.res.dto';
import { UserService } from './services/users.service';

@ApiTags('Пользователи')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Получить список всех пользователей',
    description: 'Получить список всех пользователей',
  })
  @Get()
  async getAllUsers(): Promise<UserResDto[]> {
    return await this.userService.getAllUsers();
  }

  @ApiOperation({
    summary: 'Получить пользователя по ID',
    description: 'Получить пользователя по ID',
  })
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserResDto> {
    return await this.userService.getUserById(id);
  }

  @ApiOperation({
    summary: 'Обновить пользователя',
    description: 'Обновить пользователя',
  })
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserReqDto,
  ): Promise<UserResDto> {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @ApiOperation({
    summary: 'Удалить пользователя',
    description: 'Удалить пользователя',
  })
  @Patch(':id/upgrade')
  async upgradeAccount(
    @Param('id') id: string,
    @Body() upgradeAccountDto: UpgradeAccountReqDto,
  ): Promise<UserResDto> {
    return await this.userService.upgradeAccount(id, upgradeAccountDto);
  }

  @ApiOperation({
    summary: 'Удалить пользователя',
    description: 'Удалить пользователя',
  })
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return await this.userService.deleteUser(id);
  }
}
