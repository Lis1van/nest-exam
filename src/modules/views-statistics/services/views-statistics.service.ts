import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ViewStatistic } from '../../../database/entities/views-statistic.entity';
import { ViewStatisticRepository } from '../../repositories/services/view-statistic.repository';
import { CreateViewStatisticDto } from '../models/dto/req/create-views-statistic.req.dto';
import { UpdateViewStatisticDto } from '../models/dto/req/update-views-statistic.req.dto';

@Injectable()
export class ViewStatisticsService {
  private readonly logger = new Logger(ViewStatisticsService.name);

  constructor(
    @InjectRepository(ViewStatisticRepository)
    private readonly viewStatisticRepository: ViewStatisticRepository,
  ) {}

  // Создание статистики
  async create(
    createViewStatisticDto: CreateViewStatisticDto,
  ): Promise<ViewStatistic> {
    this.logger.log('Creating view statistic...');
    const viewStatistic = this.viewStatisticRepository.create(
      createViewStatisticDto,
    );
    const savedStatistic =
      await this.viewStatisticRepository.save(viewStatistic);
    this.logger.log(`View statistic created with ID: ${savedStatistic.id}`);
    return savedStatistic;
  }

  // Обновление статистики
  async update(
    id: string,
    updateViewStatisticDto: UpdateViewStatisticDto,
  ): Promise<ViewStatistic> {
    this.logger.log(`Updating view statistic with ID: ${id}`);
    await this.viewStatisticRepository.update(id, updateViewStatisticDto);
    const updatedStatistic = await this.viewStatisticRepository.findOne({
      where: { id },
    });

    if (updatedStatistic) {
      this.logger.log(
        `View statistic updated: ${JSON.stringify(updatedStatistic)}`,
      );
    } else {
      this.logger.warn(`No view statistic found with ID: ${id}`);
    }

    return updatedStatistic;
  }

  // Получение статистики по ID
  async findById(id: string): Promise<ViewStatistic> {
    this.logger.log(`Fetching view statistic by ID: ${id}`);
    const statistic = await this.viewStatisticRepository.findOne({
      where: { id },
    });

    if (statistic) {
      this.logger.log(`View statistic found: ${JSON.stringify(statistic)}`);
    } else {
      this.logger.warn(`No view statistic found with ID: ${id}`);
    }

    return statistic;
  }

  // Получение статистики по listingId
  async findByListingId(listingId: string): Promise<ViewStatistic[]> {
    this.logger.log(`Fetching view statistics by listing ID: ${listingId}`);
    const statistics = await this.viewStatisticRepository.find({
      where: { listingId },
    });

    this.logger.log(
      `Found ${statistics.length} statistic(s) for listing ID: ${listingId}`,
    );
    return statistics;
  }
}
