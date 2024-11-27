import { Injectable } from '@nestjs/common';

import { CreatePermissionDto } from '../models/dto/req/create-permission.req.dto';
import { UpdatePermissionDto } from '../models/dto/req/update-permission.req.dto';

@Injectable()
export class PermissionsService {
  create(createPermissionDto: CreatePermissionDto) {
    return 'This action adds a new permission';
  }

  findAll() {
    return `This action returns all permissions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} permission`;
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return `This action updates a #${id} permission`;
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}
