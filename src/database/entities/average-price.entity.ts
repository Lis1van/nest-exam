import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CarBrand } from './car-brand.entity';
import { CarModel } from './car-model.entity';
import { TableName } from './enums/table-name.enum';
import { CreateUpdateModel } from './models/create-update.model';

@Entity(TableName.AVERAGE_PRICE)
export class AveragePrice extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: string; // Уникальный идентификатор средней цены

  @Column({ nullable: false, length: 100 })
  region: string; // Регион, для которого указана средняя цена

  @Column({ nullable: false })
  brandId: string; // Идентификатор марки автомобиля
  @ManyToOne(() => CarBrand, (carBrand) => carBrand.models, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'brandId' })
  brand: CarBrand; // Связь с маркой автомобиля

  @Column({ nullable: false })
  modelId: string; // Идентификатор модели автомобиля
  @ManyToOne(() => CarModel, (carModel) => carModel.averagePrices, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'modelId' })
  model: CarModel; // Связь с моделью автомобиля

  @Column('decimal', { nullable: false, precision: 10, scale: 2 })
  averagePrice: number; // Средняя цена автомобиля с указанием точности
}

// import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

// import { CarBrand } from './car-brand.entity';
// import { CarModel } from './car-model.entity';
// import { TableName } from './enums/table-name.enum';

// @Entity({ name: TableName.AVERAGE_PRICE })
// export class AveragePrice {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ nullable: false })
//   region: string;

//   @Column({ type: 'decimal', name: 'average_price', nullable: false })
//   averagePrice: number;

//   @ManyToOne(() => CarBrand, (brand) => brand.id, { nullable: false })
//   brand: CarBrand;

//   @ManyToOne(() => CarModel, (model) => model.id, { nullable: false })
//   model: CarModel;
// }
