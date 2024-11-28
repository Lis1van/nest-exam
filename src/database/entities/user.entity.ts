import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { TableName } from './enums/table-name.enum';
import { Listing } from './listing.entity';
import { CreateUpdateModel } from './models/create-update.model';
// import { RefreshToken } from './refresh-token.entity';
import { Role } from './role.entity';

@Entity(TableName.USER)
export class User extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: string; // Уникальный идентификатор пользователя

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  region: string;

  @Column({ type: 'enum', enum: ['basic', 'premium'], default: 'basic' })
  accountType: 'basic' | 'premium'; // Тип аккаунта пользователя

  @Column()
  roleId: string; // Идентификатор роли пользователя
  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'roleId' })
  role: Role; // Связь с ролью пользователя

  @OneToMany(() => Listing, (listing) => listing.user)
  listing: Listing[]; // Список объявлений, связанных с пользователем
}

// import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

// import { TableName } from './enums/table-name.enum';
// import { CreateUpdateModel } from './models/create-update.model';
// import { Role } from './role.entity';

// @Entity({ name: TableName.USER })
// export class User extends CreateUpdateModel {
//   @PrimaryGeneratedColumn()
//   id: string;

//   @Column({ unique: true, nullable: false })
//   username: string;

//   @Column({ unique: true, nullable: false })
//   email: string;

//   @Column({ name: 'password_hash', nullable: false })
//   passwordHash: string;

//   @Column({ type: 'enum', enum: ['ADMIN', 'USER'], nullable: false })
//   accountType: 'ADMIN' | 'USER';

//   @Column({ nullable: true })
//   region: string;

//   @ManyToOne(() => Role, (role) => role.users, { nullable: false })
//   role: Role;
// }
