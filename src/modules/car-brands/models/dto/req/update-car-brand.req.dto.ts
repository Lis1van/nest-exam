import { PartialType } from '@nestjs/swagger';

import { CreateCarBrandDto } from './create-car-brand.req.dto';

export class UpdateCarBrandDto extends PartialType(CreateCarBrandDto) {}
