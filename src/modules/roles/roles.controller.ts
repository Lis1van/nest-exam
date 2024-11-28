import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateRoleReqDto } from './models/dto/req/create-role.req.dto';
import { UpdateRoleReqDto } from './models/dto/req/update-role.req.dto';
import { RoleResDto } from './models/dto/res/role.res.dto';
import { RoleService } from './services/roles.service';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async getAllRoles(): Promise<RoleResDto[]> {
    return await this.roleService.getAllRoles();
  }

  @Post()
  async createRole(
    @Body() createRoleDto: CreateRoleReqDto,
  ): Promise<RoleResDto> {
    return await this.roleService.createRole(createRoleDto);
  }

  @Get(':id')
  async getRoleById(@Param('id') id: string): Promise<RoleResDto> {
    return await this.roleService.getRoleById(id);
  }

  @Patch(':id')
  async updateRole(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleReqDto,
  ): Promise<RoleResDto> {
    return await this.roleService.updateRole(id, updateRoleDto);
  }

  @Delete(':id')
  async deleteRole(@Param('id') id: string): Promise<void> {
    return await this.roleService.deleteRole(id);
  }
}
