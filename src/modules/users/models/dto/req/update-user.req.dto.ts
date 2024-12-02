import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserReqDto {
  @ApiProperty({ description: 'Имя пользователя', example: 'John Doe' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Регион пользователя',
    example: 'California',
    required: false,
  })
  @IsString()
  @IsOptional()
  region?: string;
}
