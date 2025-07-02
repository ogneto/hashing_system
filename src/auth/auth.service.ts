import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { StudentService } from 'src/student/student.service';
import { HashingService } from './hashing/hashing.service';
import { TeacherService } from 'src/teacher/teacher.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly studentService: StudentService,
    private readonly teacherService: TeacherService,
    private readonly hashingService: HashingService,
  ) {}

  async studentLogin(loginDto: LoginDto) {
    const student = await this.studentService.findByEmail(loginDto.email);
    if (!student) {
      return this.studentService.notFound();
    }

    const passwordIsValid = await this.hashingService.compare(
      loginDto.password,
      student.student_passwordHash,
    );

    if (!passwordIsValid) {
      throw new UnauthorizedException(`This password isn't valid.`);
    }

    return {
      message: 'Login!',
    };
  }

  async teacherLogin(loginDto: LoginDto) {
    const teacher = await this.teacherService.findByEmail(loginDto.email);

    if (!teacher) {
      return this.teacherService.notFound();
    }

    const passwordIsValid = await this.hashingService.compare(
      loginDto.password,
      teacher.teacher_passwordHash,
    );

    if (!passwordIsValid) {
      throw new UnauthorizedException(`This password isn't valid.`);
    }

    return {
      message: 'Login!',
    };
  }
}
