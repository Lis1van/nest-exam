import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { AssignPermissionReqDto } from './models/dto/req/assign-permission.req.dto';
import { CreatePermissionReqDto } from './models/dto/req/create-permission.req.dto';
import { UpdatePermissionReqDto } from './models/dto/req/update-permission.req.dto';
import { PermissionResDto } from './models/dto/res/permission.res.dto';
import { PermissionService } from './services/permissions.service';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  async getAllPermissions(): Promise<PermissionResDto[]> {
    return await this.permissionService.getAllPermissions();
  }

  @Post()
  async createPermission(
    @Body() createPermissionDto: CreatePermissionReqDto,
  ): Promise<PermissionResDto> {
    return await this.permissionService.createPermission(createPermissionDto);
  }

  @Get(':id')
  async getPermissionById(@Param('id') id: string): Promise<PermissionResDto> {
    return await this.permissionService.getPermissionById(id);
  }

  @Patch(':id')
  async updatePermission(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionReqDto,
  ): Promise<PermissionResDto> {
    return await this.permissionService.updatePermission(
      id,
      updatePermissionDto,
    );
  }

  @Delete(':id')
  async deletePermission(@Param('id') id: string): Promise<void> {
    return await this.permissionService.deletePermission(id);
  }

  @Post('assign-to-role')
  async assignPermissionToRole(
    @Body() assignPermissionDto: AssignPermissionReqDto,
  ): Promise<void> {
    return await this.permissionService.assignPermissionToRole(
      assignPermissionDto,
    );
  }
}
