import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCarModelReqDto {
  @ApiProperty({
    description: 'Название модели',
    example: 'Sedan',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;
}
