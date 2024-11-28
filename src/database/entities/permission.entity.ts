import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { TableName } from './enums/table-name.enum';
import { CreateUpdateModel } from './models/create-update.model';
import { RolePermission } from './role-permission.entity';

@Entity(TableName.PERMISSION)
export class Permission extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: string; // Уникальный идентификатор разрешения

  @Column({ unique: true, nullable: false })
  name: string; // Название разрешения, должно быть уникальным

  @OneToMany(
    () => RolePermission,
    (rolePermission: RolePermission) => rolePermission.permission,
    {
      cascade: true,
    },
  )
  rolePermissions: RolePermission[]; // Список связей разрешений с ролями
}

// import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

// import { TableName } from './enums/table-name.enum';
// import { Role } from './role.entity';

// @Entity({ name: TableName.PERMISSION })
// export class Permission {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ nullable: false })
//   name: string;

//   @ManyToMany(() => Role, (role) => role.permissions)
//   roles: Role[];
// }
