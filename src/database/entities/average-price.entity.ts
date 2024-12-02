// import {
//   Column,
//   Entity,
//   JoinColumn,
//   ManyToOne,
//   PrimaryGeneratedColumn,
// } from 'typeorm';

// import { CarBrand } from './car-brand.entity';
// import { CarModel } from './car-model.entity';
// import { TableName } from './enums/table-name.enum';

// @Entity(TableName.AVERAGE_PRICE)
// export class AveragePrice {
//   @PrimaryGeneratedColumn('uuid')
//   id: string; // Уникальный идентификатор средней цены

//   @Column({ nullable: false, length: 100 })
//   region: string; // Регион, для которого указана средняя цена

//   @Column({ nullable: false })
//   brandId: string; // Идентификатор марки автомобиля
//   @ManyToOne(() => CarBrand, (carBrand) => carBrand.models, {
//     nullable: false,
//     onDelete: 'CASCADE',
//   })
//   @JoinColumn({ name: 'brandId' })
//   brand: CarBrand; // Связь с маркой автомобиля

//   @Column({ nullable: false })
//   modelId: string; // Идентификатор модели автомобиля
//   @ManyToOne(() => CarModel, (carModel) => carModel.averagePrices, {
//     nullable: false,
//     onDelete: 'CASCADE',
//   })
//   @JoinColumn({ name: 'modelId' })
//   model: CarModel; // Связь с моделью автомобиля

//   @Column('decimal', { nullable: false, precision: 10, scale: 2 })
//   averagePrice: string; // Средняя цена автомобиля с указанием точности

//   @Column({ type: 'timestamp' })
//   updatedAt: Date;
// }

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

@Entity(TableName.AVERAGE_PRICE)
export class AveragePrice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, length: 100 })
  region: string;

  @Column({ nullable: false })
  brandId: string;
  @ManyToOne(() => CarBrand, (carBrand) => carBrand.models, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'brandId' })
  brand: CarBrand;

  @Column({ nullable: false })
  modelId: string;
  @ManyToOne(() => CarModel, (carModel) => carModel.averagePrices, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'modelId' })
  model: CarModel;

  @Column('decimal', { nullable: false, precision: 10, scale: 2 })
  averagePrice: number; // Исправлено с string на number

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
