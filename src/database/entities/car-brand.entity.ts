// import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

// import { AveragePrice } from './average-price.entity';
// import { CarModel } from './car-model.entity';
// import { TableName } from './enums/table-name.enum';
// import { Listing } from './listing.entity';
// import { CreateUpdateModel } from './models/create-update.model';

// @Entity(TableName.CAR_BRAND)
// export class CarBrand extends CreateUpdateModel {
//   @PrimaryGeneratedColumn('uuid')
//   id: string; // Уникальный идентификатор марки автомобиля

//   @Column({ unique: true, nullable: false, length: 50 })
//   name: string; // Название марки автомобиля (должно быть уникальным)

//   @OneToMany(() => CarModel, (model) => model.brand, { cascade: true })
//   models: CarModel[]; // Список моделей, связанных с этой маркой

//   @OneToMany(() => Listing, (listing) => listing.brand, { cascade: true })
//   listings: Listing[]; // Список объявлений, связанных с этой маркой

//   @OneToMany(() => AveragePrice, (averagePrice) => averagePrice.brand, {
//     cascade: true,
//   })
//   averagePrices: AveragePrice[]; // Список средних цен для данной марки
// }

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { AveragePrice } from './average-price.entity';
import { CarModel } from './car-model.entity';
import { TableName } from './enums/table-name.enum';
import { Listing } from './listing.entity';
import { CreateUpdateModel } from './models/create-update.model';

@Entity(TableName.CAR_BRAND)
export class CarBrand extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false, length: 50 })
  name: string;

  @OneToMany(() => CarModel, (model) => model.brand, { cascade: true })
  models: CarModel[];

  @OneToMany(() => Listing, (listing) => listing.brand, { cascade: true })
  listings: Listing[];

  @OneToMany(() => AveragePrice, (averagePrice) => averagePrice.brand, {
    cascade: true,
  })
  averagePrices: AveragePrice[]; // Связь с AveragePrice
}
