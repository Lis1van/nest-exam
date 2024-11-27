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

  // @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  // refreshTokens: RefreshToken[]; // Список токенов обновления
}
