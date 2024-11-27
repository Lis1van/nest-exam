import { PartialType } from '@nestjs/swagger';

import { CreateRoleDto } from './create-role.req.dto';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
