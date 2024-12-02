import { ApiProperty } from '@nestjs/swagger';

export class CarBrandResDto {
  @ApiProperty({ description: 'Идентификатор бренда' })
  id: string;

  @ApiProperty({ description: 'Название бренда' })
  name: string;
}
