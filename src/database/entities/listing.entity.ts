import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CarBrand } from './car-brand.entity';
import { CarModel } from './car-model.entity';
import { TableName } from './enums/table-name.enum';
import { CreateUpdateModel } from './models/create-update.model';
import { User } from './user.entity';
import { ViewStatistic } from './views-statistic.entity';

@Entity(TableName.LISTING)
export class Listing extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  userId: string;
  @ManyToOne(() => User, (user) => user.listings, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: false })
  brandId: string;
  @ManyToOne(() => CarBrand, (carBrand) => carBrand.listings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'brandId' })
  brand: CarBrand;

  @Column({ nullable: false })
  modelId: string;
  @ManyToOne(() => CarModel, (carModel) => carModel.listings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'modelId' })
  model: CarModel;

  @Column('decimal', { nullable: false })
  price: number;

  @Column({ type: 'enum', enum: ['USD', 'EUR', 'UAH'], nullable: false })
  currency: 'USD' | 'EUR' | 'UAH';

  @Column({ nullable: false })
  originalCurrency: string;

  @Column({ type: 'float', nullable: true })
  exchangeRate: number; // Храним курс напрямую

  @Column({
    type: 'enum',
    enum: ['active', 'inactive', 'moderation'],
    nullable: false,
  })
  status: 'active' | 'inactive' | 'moderation';

  @Column({ default: 0 })
  editAttempts: number;

  @Column('text', { nullable: false })
  description: string;

  @OneToMany(() => ViewStatistic, (viewStatistic) => viewStatistic.listing, {
    cascade: true,
  })
  viewStatistics: ViewStatistic[];

  @Column({ type: 'decimal', nullable: true })
  priceInCurrency?: number; // Цена в валюте пользователя, рассчитанная на основе exchangeRate

  @Column({ type: 'decimal', nullable: true })
  priceInOriginalCurrency?: number; // Цена в оригинальной валюте USD для точных расчетов

  // Хук для автоматического заполнения поля originalCurrency
  @BeforeInsert()
  setOriginalCurrency() {
    this.originalCurrency = this.currency; // Устанавливаем originalCurrency равным currency
  }
}
