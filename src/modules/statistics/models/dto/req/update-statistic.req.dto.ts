import { PartialType } from '@nestjs/swagger';

import { CreateStatisticDto } from './create-statistic.req.dto';

export class UpdateStatisticDto extends PartialType(CreateStatisticDto) {}
