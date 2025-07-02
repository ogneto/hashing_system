import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTeacherDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  teacher_name: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(10)
  teacher_email: string;

  @IsString()
  @MinLength(5)
  teacher_passwordHash: string;
}
