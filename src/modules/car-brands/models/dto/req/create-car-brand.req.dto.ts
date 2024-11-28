import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCarBrandReqDto {
  @ApiProperty({ description: 'Название бренда', example: 'Toyota' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
