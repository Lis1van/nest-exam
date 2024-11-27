import { PartialType } from '@nestjs/swagger';

import { CreateViewsStatisticDto } from './create-views-statistic.req.dto';

export class UpdateViewsStatisticDto extends PartialType(
  CreateViewsStatisticDto,
) {}
