import { Injectable } from '@nestjs/common';

import { AssignPermissionReqDto } from '../models/dto/req/assign-permission.req.dto';
import { CreatePermissionReqDto } from '../models/dto/req/create-permission.req.dto';
import { UpdatePermissionReqDto } from '../models/dto/req/update-permission.req.dto';
import { Permission } from '../models/interfaces/permission.interface';

@Injectable()
export class PermissionService {
  private permissions: Permission[] = [];

  async getAllPermissions(): Promise<Permission[]> {
    return this.permissions;
  }

  async createPermission(
    createPermissionDto: CreatePermissionReqDto,
  ): Promise<Permission> {
    const newPermission: Permission = {
      id: String(this.permissions.length + 1),
      name: createPermissionDto.name,
      description: createPermissionDto.description,
    };
    this.permissions.push(newPermission);
    return newPermission;
  }

  async getPermissionById(id: string): Promise<Permission> {
    const permission = this.permissions.find(
      (permission) => permission.id === id,
    );
    if (!permission) {
      throw new Error(`Permission with id ${id} not found`);
    }
    return permission;
  }

  async updatePermission(
    id: string,
    updatePermissionDto: UpdatePermissionReqDto,
  ): Promise<Permission> {
    const permission = await this.getPermissionById(id);
    if (permission) {
      Object.assign(permission, updatePermissionDto);
    }
    return permission;
  }

  async deletePermission(id: string): Promise<void> {
    this.permissions = this.permissions.filter(
      (permission) => permission.id !== id,
    );
  }

  async assignPermissionToRole(
    assignPermissionDto: AssignPermissionReqDto,
  ): Promise<void> {
    // Логика назначения разрешения роли
  }
}
