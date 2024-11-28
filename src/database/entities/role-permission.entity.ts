import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { TableName } from './enums/table-name.enum';
import { CreateUpdateModel } from './models/create-update.model';
import { Permission } from './permission.entity';
import { Role } from './role.entity';

@Entity(TableName.ROLE_PERMISSION)
export class RolePermission extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: string; // Уникальный идентификатор роли и разрешения

  // @Column({ nullable: false })
  // roleId: string; // Идентификатор роли

  @ManyToOne(() => Role, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'roleId' })
  role: Role; // Связь с ролью

  @Column()
  permissionId: string; // Идентификатор разрешения
  @ManyToOne(() => Permission, (permission) => permission.rolePermissions, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'permissionId' })
  permission: Permission; // Связь с разрешением
}
