import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateListingReqDto {
  @ApiProperty({
    description: 'Заголовок объявления',
    example: 'Продаю автомобиль',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Описание объявления',
    example: 'Отличное состояние, торг уместен',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'ID пользователя, создавшего объявление',
    example: '123',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;
}
