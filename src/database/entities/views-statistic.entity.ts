// import {
//   Column,
//   Entity,
//   JoinColumn,
//   ManyToOne,
//   PrimaryGeneratedColumn,
// } from 'typeorm';

// import { TableName } from './enums/table-name.enum';
// import { Listing } from './listing.entity';
// import { CreateUpdateModel } from './models/create-update.model';

// @Entity(TableName.VIEWS_STATISTIC)
// export class ViewStatistic extends CreateUpdateModel {
//   @PrimaryGeneratedColumn('uuid')
//   id: string; // Уникальный идентификатор статистики просмотров

//   @Column('int', { nullable: false })
//   listingId: string; // Идентификатор объявления, к которому относится статистика
//   @ManyToOne(() => Listing, (listing) => listing.viewStatistics, {
//     nullable: false,
//   })
//   @JoinColumn({ name: 'listingId' })
//   listing: Listing; // Связь со списком объявлений

//   @Column('int', { default: 0 })
//   viewsDaily: number; // Количество просмотров за день, по умолчанию 0

//   @Column('int', { default: 0 })
//   viewsWeekly: number; // Количество просмотров за неделю, по умолчанию 0

//   @Column('int', { default: 0 })
//   viewsMonthly: number; // Количество просмотров за месяц, по умолчанию 0
// }

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { TableName } from './enums/table-name.enum';
import { Listing } from './listing.entity';
import { CreateUpdateModel } from './models/create-update.model';

@Entity(TableName.VIEWS_STATISTIC)
export class ViewStatistic extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: string; // Уникальный идентификатор статистики просмотров

  @Column('int', { nullable: false })
  listingId: string; // Идентификатор объявления, к которому относится статистика

  @ManyToOne(() => Listing, (listing) => listing.viewStatistics, {
    nullable: false,
    onDelete: 'CASCADE', // Добавлено для каскадного удаления
  })
  @JoinColumn({ name: 'listingId' })
  listing: Listing; // Связь с объявлением

  @Column('int', { default: 0 })
  viewsDaily: number; // Количество просмотров за день, по умолчанию 0

  @Column('int', { default: 0 })
  viewsWeekly: number; // Количество просмотров за неделю, по умолчанию 0

  @Column('int', { default: 0 })
  viewsMonthly: number; // Количество просмотров за месяц, по умолчанию 0
}
