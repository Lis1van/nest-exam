import { ApiProperty } from '@nestjs/swagger';

export class RoleResDto {
  @ApiProperty({ description: 'Идентификатор роли', example: '1' })
  id: string;

  @ApiProperty({ description: 'Название роли', example: 'Admin' })
  name: string;

  @ApiProperty({
    description: 'Описание роли',
    example: 'Администратор системы',
  })
  description: string;
}
