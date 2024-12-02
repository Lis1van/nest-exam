// import { IsUUID } from 'class-validator';
// import {
//   Column,
//   Entity,
//   JoinColumn,
//   ManyToOne,
//   OneToMany,
//   PrimaryGeneratedColumn,
// } from 'typeorm';

// import { AveragePrice } from './average-price.entity';
// import { CarBrand } from './car-brand.entity';
// import { TableName } from './enums/table-name.enum';
// import { Listing } from './listing.entity';
// import { CreateUpdateModel } from './models/create-update.model';

// @Entity(TableName.CAR_MODEL)
// export class CarModel extends CreateUpdateModel {
//   @PrimaryGeneratedColumn('uuid')
//   id: string; // Уникальный идентификатор модели автомобиля

//   @Column({ nullable: false })
//   @IsUUID()
//   brandId: string; // Идентификатор марки автомобиля
//   @ManyToOne(() => CarBrand, (brand) => brand.models, {
//     nullable: false,
//     onDelete: 'CASCADE',
//   })
//   @JoinColumn({ name: 'brandId' })
//   brand: CarBrand; // Связь с маркой автомобиля

//   @Column({ nullable: false, length: 50, unique: true }) // Указать максимальную длину и уникальность
//   name: string; // Название модели автомобиля

//   @OneToMany(() => Listing, (listing) => listing.model)
//   listings: Listing[]; // Связь с объявлениями, связанными с моделью

//   @OneToMany(() => AveragePrice, (averagePrice) => averagePrice.model)
//   averagePrices: AveragePrice[]; // Связь со средними ценами для данной модели
// }

import { IsUUID } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { AveragePrice } from './average-price.entity';
import { CarBrand } from './car-brand.entity';
import { TableName } from './enums/table-name.enum';
import { Listing } from './listing.entity';
import { CreateUpdateModel } from './models/create-update.model';

@Entity(TableName.CAR_MODEL)
export class CarModel extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  @IsUUID()
  brandId: string;
  @ManyToOne(() => CarBrand, (brand) => brand.models, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'brandId' })
  brand: CarBrand;

  @Column({ nullable: false, length: 50 })
  @Unique(['brandId', 'name']) // Уникальная комбинация
  name: string;

  @OneToMany(() => Listing, (listing) => listing.model)
  listings: Listing[];

  @OneToMany(() => AveragePrice, (averagePrice) => averagePrice.model)
  averagePrices: AveragePrice[];
}
