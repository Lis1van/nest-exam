import { ApiProperty } from '@nestjs/swagger';

export class PermissionResDto {
  @ApiProperty({ description: 'Идентификатор разрешения', example: '1' })
  id: string;

  @ApiProperty({ description: 'Название разрешения', example: 'VIEW_USER' })
  name: string;

  @ApiProperty({
    description: 'Описание разрешения',
    example: 'Доступ к просмотру пользователей',
  })
  description: string;
}
