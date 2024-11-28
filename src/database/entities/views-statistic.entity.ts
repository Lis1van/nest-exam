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
  })
  @JoinColumn({ name: 'listingId' })
  listing: Listing; // Связь со списком объявлений

  @Column('int', { default: 0 })
  viewsDaily: number; // Количество просмотров за день, по умолчанию 0

  @Column('int', { default: 0 })
  viewsWeekly: number; // Количество просмотров за неделю, по умолчанию 0

  @Column('int', { default: 0 })
  viewsMonthly: number; // Количество просмотров за месяц, по умолчанию 0
}

// import {
//   Column,
//   Entity,
//   JoinColumn,
//   OneToOne,
//   PrimaryGeneratedColumn,
// } from 'typeorm';

// import { TableName } from './enums/table-name.enum';
// import { Listing } from './listing.entity';

// @Entity({ name: TableName.VIEWS_STATISTIC })
// export class ViewsStatistic {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @OneToOne(() => Listing)
//   @JoinColumn()
//   listing: Listing;

//   @Column({ name: 'views_daily', type: 'integer', nullable: false })
//   viewsDaily: number;

//   @Column({ name: 'views_weekly', type: 'integer', nullable: false })
//   viewsWeekly: number;

//   @Column({ name: 'views_monthly', type: 'integer', nullable: false })
//   viewsMonthly: number;
// }
