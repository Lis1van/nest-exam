import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CarBrand } from '../../../database/entities/car-brand.entity';
import { CreateCarBrandReqDto } from '../models/dto/req/create-car-brand.req.dto';
import { UpdateCarBrandReqDto } from '../models/dto/req/update-car-brand.req.dto';

@Injectable()
export class CarBrandService {
  constructor(
    @InjectRepository(CarBrand)
    private readonly carBrandRepository: Repository<CarBrand>,
  ) {}

  async create(createCarBrandDto: CreateCarBrandReqDto): Promise<CarBrand> {
    const carBrand = this.carBrandRepository.create(createCarBrandDto);
    return await this.carBrandRepository.save(carBrand);
  }

  async findAll(): Promise<CarBrand[]> {
    return await this.carBrandRepository.find({ relations: ['models'] });
  }

  async findOne(id: string): Promise<CarBrand> {
    const carBrand = await this.carBrandRepository.findOne({
      where: { id },
      relations: ['models'],
    });
    if (!carBrand) throw new NotFoundException('Car brand not found');
    return carBrand;
  }

  async update(
    id: string,
    updateCarBrandDto: UpdateCarBrandReqDto,
  ): Promise<CarBrand> {
    const carBrand = await this.findOne(id);
    Object.assign(carBrand, updateCarBrandDto);
    return await this.carBrandRepository.save(carBrand);
  }

  async remove(id: string): Promise<void> {
    const carBrand = await this.findOne(id);
    await this.carBrandRepository.remove(carBrand);
  }
}
