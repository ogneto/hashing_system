import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [TeacherModule, StudentModule, CourseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
