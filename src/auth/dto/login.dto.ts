import { Injectable } from '@nestjs/common';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@Injectable()
export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
