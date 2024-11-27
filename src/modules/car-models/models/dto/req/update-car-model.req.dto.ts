import { PartialType } from '@nestjs/swagger';

import { CreateCarModelDto } from './create-car-model.req.dto';

export class UpdateCarModelDto extends PartialType(CreateCarModelDto) {}
