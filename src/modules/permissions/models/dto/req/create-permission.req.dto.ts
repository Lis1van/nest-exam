import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePermissionReqDto {
  @ApiProperty({ description: 'Название разрешения', example: 'VIEW_USER' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Описание разрешения',
    example: 'Доступ к просмотру пользователей',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
