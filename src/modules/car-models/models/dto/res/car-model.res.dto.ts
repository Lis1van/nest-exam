import { ApiProperty } from '@nestjs/swagger';

export class CarModelResDto {
  @ApiProperty({ description: 'Идентификатор модели' })
  id: string;

  @ApiProperty({ description: 'Название модели' })
  name: string;
}
