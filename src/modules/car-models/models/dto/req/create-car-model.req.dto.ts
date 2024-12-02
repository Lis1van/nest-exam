import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateCarModelReqDto {
  @ApiProperty({ description: 'Идентификатор бренда', example: 'uuid-1234' })
  @IsUUID()
  brandId: string;

  @ApiProperty({ description: 'Название модели', example: 'Sedan' })
  @IsString()
  name: string;
}
