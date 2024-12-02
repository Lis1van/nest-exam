import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateRoleReqDto {
  @ApiProperty({
    description: 'Название роли',
    example: 'Admin',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Описание роли',
    example: 'Администратор системы',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
