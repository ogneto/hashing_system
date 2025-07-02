import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  student_name: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(10)
  student_email: string;

  @IsString()
  @MinLength(5)
  student_passwordHash: string;
}
