import { ApiProperty } from '@nestjs/swagger';

export class UserResDto {
  @ApiProperty({ description: 'Идентификатор пользователя', example: '123' })
  id: string;

  @ApiProperty({ description: 'Имя пользователя', example: 'John Doe' })
  name: string;

  @ApiProperty({
    description: 'Электронная почта',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({ description: 'Тип аккаунта', example: 'basic' })
  accountType: string;
}
