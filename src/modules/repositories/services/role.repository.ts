import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Role } from '../../../database/entities/role.entity';

@Injectable()
export class RoleRepository {
  private readonly repository: Repository<Role>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Role);
  }

  async createRole(roleData: Partial<Role>): Promise<Role> {
    const role = this.repository.create(roleData);
    return await this.repository.save(role);
  }

  async findAllRoles(): Promise<Role[]> {
    return await this.repository.find();
  }

  async findRoleById(id: string): Promise<Role> {
    return await this.repository.findOne({ where: { id } });
  }

  async findRoleByName(name: string): Promise<Role> {
    return await this.repository.findOne({ where: { name } });
  }

  async updateRole(id: string, roleData: Partial<Role>): Promise<Role> {
    await this.repository.update(id, roleData);
    return await this.findRoleById(id);
  }

  async deleteRole(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
