import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AssignPermissionReqDto {
  @ApiProperty({ description: 'ID роли', example: '1' })
  @IsString()
  @IsNotEmpty()
  roleId: string;

  @ApiProperty({ description: 'ID разрешения', example: '5' })
  @IsString()
  @IsNotEmpty()
  permissionId: string;
}
