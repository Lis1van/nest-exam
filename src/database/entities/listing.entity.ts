import {
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
  id: string; // Уникальный идентификатор объявления

  @Column({ nullable: false })
  userId: string; // Идентификатор пользователя, который создал объявление

  @ManyToOne(() => User, (user) => user.listing, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User; // Связь с пользователем

  @Column({ nullable: false })
  brandId: string; // Идентификатор марки автомобиля

  @ManyToOne(() => CarBrand, (carBrand) => carBrand.listings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'brandId' })
  brand: CarBrand; // Связь с маркой автомобиля

  @Column({ nullable: false })
  modelId: string; // Идентификатор модели автомобиля

  @ManyToOne(() => CarModel, (carModel) => carModel.listings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'modelId' })
  model: CarModel; // Связь с моделью автомобиля

  @Column('decimal', { nullable: false })
  price: number; // Цена объявления

  @Column({ type: 'enum', enum: ['USD', 'EUR', 'UAH'], nullable: false })
  currency: 'USD' | 'EUR' | 'UAH'; // Валюта объявления

  @Column({ nullable: false })
  originalCurrency: string; // Оригинальная валюта цены

  @Column('decimal', { nullable: false })
  exchangeRate: number; // Курс обмена на момент создания объявления

  @Column({
    type: 'enum',
    enum: ['active', 'inactive', 'moderation'],
    nullable: false,
  })
  status: 'active' | 'inactive' | 'moderation'; // Статус объявления

  @Column({ default: 0 })
  editAttempts: number; // Количество попыток редактирования объявления

  @Column('text', { nullable: false })
  description: string; // Описание объявления

  @OneToMany(() => ViewStatistic, (viewStatistic) => viewStatistic.listing, {
    cascade: true,
  })
  viewStatistics: ViewStatistic[]; // Статистика просмотров для объявления
}
