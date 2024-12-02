import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePermissionReqDto {
  @ApiProperty({
    description: 'Название разрешения',
    example: 'EDIT_USER',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Описание разрешения',
    example: 'Редактирование пользователей',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
