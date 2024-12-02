import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleReqDto {
  @ApiProperty({ description: 'Название роли', example: 'Admin' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Описание роли',
    example: 'Администратор системы',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
