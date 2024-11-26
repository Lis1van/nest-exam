import { PickType } from '@nestjs/swagger';

import { UserBaseReqDto } from './user-base.req.dto';
// import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto extends PickType(UserBaseReqDto, [
  'name',
  'email',
  'password',
  'region',
  'accountType',
]) {}
