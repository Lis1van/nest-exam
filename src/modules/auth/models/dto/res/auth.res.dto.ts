// import { ApiProperty } from '@nestjs/swagger';

// export class AuthResDto {
//   @ApiProperty({ description: 'Идентификатор пользователя' })
//   userId: string;

//   @ApiProperty({ description: 'Имя пользователя' })
//   userName: string;

//   @ApiProperty({ description: 'Электронная почта' })
//   email: string;
// }
import { ApiProperty } from '@nestjs/swagger';

export class AuthResDto {
  @ApiProperty({ description: 'Идентификатор пользователя' })
  userId: string;

  @ApiProperty({ description: 'Имя пользователя' })
  userName: string;

  @ApiProperty({ description: 'Электронная почта' })
  email: string;
}
