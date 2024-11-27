import { PartialType } from '@nestjs/swagger';

import { CreatePermissionDto } from './create-permission.req.dto';

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {}
