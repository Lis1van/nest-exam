import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class MarkForReviewReqDto {
  @ApiProperty({
    description: 'Причина отправки на проверку',
    example: 'Содержит оскорбления',
  })
  @IsString()
  reason: string;
}
