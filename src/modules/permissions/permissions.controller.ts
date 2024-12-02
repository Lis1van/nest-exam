import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AssignPermissionReqDto } from './models/dto/req/assign-permission.req.dto';
import { CreatePermissionReqDto } from './models/dto/req/create-permission.req.dto';
import { UpdatePermissionReqDto } from './models/dto/req/update-permission.req.dto';
import { PermissionResDto } from './models/dto/res/permission.res.dto';
import { PermissionService } from './services/permissions.service';

@ApiTags('Разрешения')
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionService: PermissionService) {}

  @ApiOperation({
    summary: 'Получить список всех разрешений',
    description: 'Получить список всех разрешений',
  })
  @Get()
  async getAllPermissions(): Promise<PermissionResDto[]> {
    return await this.permissionService.getAllPermissions();
  }

  @ApiOperation({
    summary: 'Создать новое разрешение',
    description: 'Создать новое разрешение',
  })
  @Post()
  async createPermission(
    @Body() createPermissionDto: CreatePermissionReqDto,
  ): Promise<PermissionResDto> {
    return await this.permissionService.createPermission(createPermissionDto);
  }

  @ApiOperation({
    summary: 'Получить разрешение по идентификатору',
    description: 'Получить разрешение по идентификатору',
  })
  @Get(':id')
  async getPermissionById(@Param('id') id: string): Promise<PermissionResDto> {
    return await this.permissionService.getPermissionById(id);
  }

  @ApiOperation({
    summary: 'Обновить разрешение',
    description: 'Обновить разрешение',
  })
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

  @ApiOperation({
    summary: 'Удалить разрешение',
    description: 'Удалить разрешение',
  })
  @Delete(':id')
  async deletePermission(@Param('id') id: string): Promise<void> {
    return await this.permissionService.deletePermission(id);
  }

  @ApiOperation({
    summary: 'Назначить разрешение роли',
    description: 'Назначить разрешение роли',
  })
  @Post('assign-to-role')
  async assignPermissionToRole(
    @Body() assignPermissionDto: AssignPermissionReqDto,
  ): Promise<void> {
    return await this.permissionService.assignPermissionToRole(
      assignPermissionDto,
    );
  }
}
