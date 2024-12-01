// import { ApiProperty } from '@nestjs/swagger';

// export class TokenPairResDto {
//   @ApiProperty({ description: 'Access Token' })
//   accessToken: string;

//   @ApiProperty({ description: 'Refresh Token' })
//   refreshToken: string;
// }

import { ApiProperty } from '@nestjs/swagger';

export class TokenPairResDto {
  @ApiProperty({ description: 'Access Token' })
  accessToken: string;

  @ApiProperty({ description: 'Refresh Token' })
  refreshToken: string;
}
