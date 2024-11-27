import { Injectable } from '@nestjs/common';

import { CreateCarBrandDto } from '../models/dto/req/create-car-brand.req.dto';
import { UpdateCarBrandDto } from '../models/dto/req/update-car-brand.req.dto';

@Injectable()
export class CarBrandsService {
  create(createCarBrandDto: CreateCarBrandDto) {
    return 'This action adds a new carBrand';
  }

  findAll() {
    return `This action returns all carBrands`;
  }

  findOne(id: number) {
    return `This action returns a #${id} carBrand`;
  }

  update(id: number, updateCarBrandDto: UpdateCarBrandDto) {
    return `This action updates a #${id} carBrand`;
  }

  remove(id: number) {
    return `This action removes a #${id} carBrand`;
  }
}
