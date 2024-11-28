import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { TableName } from './enums/table-name.enum';
import { CreateUpdateModel } from './models/create-update.model';
import { RolePermission } from './role-permission.entity';
import { User } from './user.entity';

@Entity(TableName.ROLE)
export class Role extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: string; // Уникальный идентификатор роли

  @Column({ nullable: false, unique: true })
  name: string; // Название роли (например, Покупатель, Продавец, Менеджер, Администратор)

  @OneToMany(() => User, (user) => user.role)
  users: User[]; // Список пользователей, связанных с этой ролью

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.role, {
    cascade: true,
  })
  rolePermissions: RolePermission[]; // Список разрешений, связанных с этой ролью
}

// import {
//   Column,
//   Entity,
//   JoinTable,
//   ManyToMany,
//   OneToMany,
//   PrimaryGeneratedColumn,
// } from 'typeorm';

// import { TableName } from './enums/table-name.enum';
// import { CreateUpdateModel } from './models/create-update.model';
// import { Permission } from './permission.entity';
// import { User } from './user.entity';

// @Entity({ name: TableName.ROLE })
// export class Role extends CreateUpdateModel {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ nullable: false })
//   name: string;

//   @OneToMany(() => User, (user) => user.role)
//   users: User[];

//   @ManyToMany(() => Permission, (permission) => permission.roles)
//   @JoinTable({ name: TableName.ROLE_PERMISSION })
//   permissions: Permission[];
// }
