import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { Role } from '../../../database/entities/role.entity';
import { RoleRepository } from '../../repositories/services/role.repository';
import { CreateRoleReqDto } from '../models/dto/req/create-role.req.dto';
import { UpdateRoleReqDto } from '../models/dto/req/update-role.req.dto';

@Injectable()
export class RoleService {
  private readonly logger = new Logger(RoleService.name);

  constructor(private readonly roleRepository: RoleRepository) {}

  async getAllRoles(): Promise<Role[]> {
    return await this.roleRepository.findAllRoles();
  }

  async createRole(createRoleDto: CreateRoleReqDto): Promise<Role> {
    try {
      const role = await this.roleRepository.createRole(createRoleDto);
      this.logger.debug('Role created:', role);
      return role;
    } catch (error) {
      this.logger.error('Failed to create role:', error);
      throw error;
    }
  }

  async getRoleById(id: string): Promise<Role> {
    const role = await this.roleRepository.findRoleById(id);
    if (!role) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }
    return role;
  }

  async updateRole(id: string, updateRoleDto: UpdateRoleReqDto): Promise<Role> {
    return await this.roleRepository.updateRole(id, updateRoleDto);
  }

  async deleteRole(id: string): Promise<void> {
    return await this.roleRepository.deleteRole(id);
  }
}
