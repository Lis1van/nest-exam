import { PartialType } from '@nestjs/swagger';

import { CreateAveragePriceDto } from './create-average-price.req.dto';

export class UpdateAveragePriceDto extends PartialType(CreateAveragePriceDto) {}
