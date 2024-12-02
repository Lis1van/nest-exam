import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarBrand } from 'src/database/entities/car-brand.entity';
import { Repository } from 'typeorm';

import { CarModel } from '../../../database/entities/car-model.entity';
import { CreateCarModelReqDto } from '../models/dto/req/create-car-model.req.dto';
import { UpdateCarModelReqDto } from '../models/dto/req/update-car-model.req.dto';

@Injectable()
export class CarModelService {
  constructor(
    @InjectRepository(CarModel)
    private readonly carModelRepository: Repository<CarModel>,
    @InjectRepository(CarBrand)
    private readonly brandRepository: Repository<CarBrand>,
  ) {}

  async createCarModel(dto: CreateCarModelReqDto): Promise<CarModel> {
    const { brandId, name } = dto;

    const brand = await this.brandRepository.findOne({
      where: { id: brandId },
    });
    if (!brand) {
      throw new NotFoundException('Бренд не найден');
    }

    const carModel = this.carModelRepository.create({
      name,
      brand,
    });

    return await this.carModelRepository.save(carModel);
  }

  async findAll(): Promise<CarModel[]> {
    return await this.carModelRepository.find({ relations: ['brand'] });
  }

  async findOne(id: string): Promise<CarModel> {
    const carModel = await this.carModelRepository.findOne({
      where: { id },
      relations: ['brand'],
    });
    if (!carModel) throw new NotFoundException('Модель автомобиля не найдена');
    return carModel;
  }

  async update(
    id: string,
    updateCarModelDto: UpdateCarModelReqDto,
  ): Promise<CarModel> {
    const carModel = await this.findOne(id);
    Object.assign(carModel, updateCarModelDto);
    return await this.carModelRepository.save(carModel);
  }

  async remove(id: string): Promise<void> {
    const carModel = await this.findOne(id);
    await this.carModelRepository.remove(carModel);
  }
}
