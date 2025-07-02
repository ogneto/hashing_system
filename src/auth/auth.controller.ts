import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  test() {
    return 'k';
  }

  @Post('student')
  studentLogin(@Body() loginDto: LoginDto) {
    return this.authService.studentLogin(loginDto);
  }

  @Post('teacher')
  teacherLogin(@Body() loginDto: LoginDto) {
    return this.authService.teacherLogin(loginDto);
  }
}
