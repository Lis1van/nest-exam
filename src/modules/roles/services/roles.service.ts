import { Injectable } from '@nestjs/common';

import { CreateRoleReqDto } from '../models/dto/req/create-role.req.dto';
import { UpdateRoleReqDto } from '../models/dto/req/update-role.req.dto';
import { Role } from '../models/interfaces/role.interface';

@Injectable()
export class RoleService {
  private roles: Role[] = [];

  async getAllRoles(): Promise<Role[]> {
    return this.roles;
  }

  async createRole(createRoleDto: CreateRoleReqDto): Promise<Role> {
    const newRole: Role = {
      id: String(this.roles.length + 1),
      name: createRoleDto.name,
      description: createRoleDto.description,
    };
    this.roles.push(newRole);
    return newRole;
  }

  async getRoleById(id: string): Promise<Role> {
    return this.roles.find((role) => role.id === id);
  }

  async updateRole(id: string, updateRoleDto: UpdateRoleReqDto): Promise<Role> {
    const role = await this.getRoleById(id);
    if (role) {
      Object.assign(role, updateRoleDto);
    }
    return role;
  }

  async deleteRole(id: string): Promise<void> {
    this.roles = this.roles.filter((role) => role.id !== id);
  }
}
