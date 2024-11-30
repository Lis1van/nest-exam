// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Param,
//   Patch,
//   Post,
// } from '@nestjs/common';

// import { CreateRoleReqDto } from './models/dto/req/create-role.req.dto';
// import { UpdateRoleReqDto } from './models/dto/req/update-role.req.dto';
// import { RoleResDto } from './models/dto/res/role.res.dto';
// import { RoleService } from './services/roles.service';

// @Controller('roles')
// export class RoleController {
//   constructor(private readonly roleService: RoleService) {}

//   @Get()
//   async getAllRoles(): Promise<RoleResDto[]> {
//     return await this.roleService.getAllRoles();
//   }

//   @Post()
//   async createRole(
//     @Body() createRoleDto: CreateRoleReqDto,
//   ): Promise<RoleResDto> {
//     return await this.roleService.createRole(createRoleDto);
//   }

//   @Get(':id')
//   async getRoleById(@Param('id') id: string): Promise<RoleResDto> {
//     return await this.roleService.getRoleById(id);
//   }

//   @Patch(':id')
//   async updateRole(
//     @Param('id') id: string,
//     @Body() updateRoleDto: UpdateRoleReqDto,
//   ): Promise<RoleResDto> {
//     return await this.roleService.updateRole(id, updateRoleDto);
//   }

//   @Delete(':id')
//   async deleteRole(@Param('id') id: string): Promise<void> {
//     return await this.roleService.deleteRole(id);
//   }
// }

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

import { Role } from '../../database/entities/role.entity';
import { CreateRoleReqDto } from './models/dto/req/create-role.req.dto';
import { UpdateRoleReqDto } from './models/dto/req/update-role.req.dto';
import { RoleService } from './services/roles.service';

@Controller('roles')
export class RoleController {
  private readonly logger = new Logger(RoleController.name);
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async getAllRoles(): Promise<Role[]> {
    return await this.roleService.getAllRoles();
  }

  @Post()
  // async createRole(@Body() createRoleDto: CreateRoleReqDto): Promise<Role> {
  //   return await this.roleService.createRole(createRoleDto);
  // }
  async createRole(@Body() createRoleDto: CreateRoleReqDto): Promise<Role> {
    this.logger.debug('Incoming DTO:', createRoleDto);
    try {
      this.logger.debug('Incoming request to create role:', createRoleDto);
      const role = await this.roleService.createRole(createRoleDto);
      this.logger.debug('Role created successfully:', role);
      return role;
    } catch (error) {
      this.logger.error('Error occurred while creating role:', error);
      throw error; // NestJS автоматически преобразует ошибку в HTTP-ответ
    }
  }

  @Get(':id')
  async getRoleById(@Param('id') id: string): Promise<Role> {
    return await this.roleService.getRoleById(id);
  }

  @Patch(':id')
  async updateRole(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleReqDto,
  ): Promise<Role> {
    return await this.roleService.updateRole(id, updateRoleDto);
  }

  @Delete(':id')
  async deleteRole(@Param('id') id: string): Promise<void> {
    return await this.roleService.deleteRole(id);
  }
}
