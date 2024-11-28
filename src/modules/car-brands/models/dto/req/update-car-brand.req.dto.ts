import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCarBrandReqDto {
  @ApiProperty({
    description: 'Название бренда',
    example: 'Toyota',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;
}
