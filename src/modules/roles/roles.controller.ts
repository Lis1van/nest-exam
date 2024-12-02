import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Role } from '../../database/entities/role.entity';
import { CreateRoleReqDto } from './models/dto/req/create-role.req.dto';
import { UpdateRoleReqDto } from './models/dto/req/update-role.req.dto';
import { RoleService } from './services/roles.service';

@ApiTags('Роли')
@Controller('roles')
export class RoleController {
  private readonly logger = new Logger(RoleController.name);
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({
    summary: 'Получить список всех ролей',
    description: 'Получить список всех ролей',
  })
  @Get()
  async getAllRoles(): Promise<Role[]> {
    return await this.roleService.getAllRoles();
  }

  @ApiOperation({
    summary: 'Создать новую роль',
    description: 'Создать новую роль',
  })
  @Post()
  async createRole(@Body() createRoleDto: CreateRoleReqDto): Promise<Role> {
    this.logger.debug('Incoming DTO:', createRoleDto);
    try {
      this.logger.debug('Incoming request to create role:', createRoleDto);
      const role = await this.roleService.createRole(createRoleDto);
      this.logger.debug('Role created successfully:', role);
      return role;
    } catch (error) {
      this.logger.error('Error occurred while creating role:', error);
      throw error;
    }
  }

  @ApiOperation({
    summary: 'Получить роль по идентификатору',
    description: 'Получить роль по идентификатору',
  })
  @Get(':id')
  async getRoleById(@Param('id') id: string): Promise<Role> {
    return await this.roleService.getRoleById(id);
  }

  @ApiOperation({
    summary: 'Обновить роль',
    description: 'Обновить роль',
  })
  @Patch(':id')
  async updateRole(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleReqDto,
  ): Promise<Role> {
    return await this.roleService.updateRole(id, updateRoleDto);
  }

  @ApiOperation({
    summary: 'Удалить роль',
    description: 'Удалить роль',
  })
  @Delete(':id')
  async deleteRole(@Param('id') id: string): Promise<void> {
    return await this.roleService.deleteRole(id);
  }
}
