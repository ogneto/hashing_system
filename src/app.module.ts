import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';
import { CourseModule } from './course/course.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: config.get('DATABASE_TYPE') as 'postgres',
        host: config.get<string>('DATABASE_HOST'),
        port: Number(config.get<string>('DATABASE_PORT')),
        username: config.get<string>('DATABASE_USERNAME'),
        password: config.get<string>('DATABASE_PASSWORD'),
        database: config.get<string>('DATABASE_DATABASE'),
        autoLoadEntities: config.get<boolean>('DATABASE_AUTOLOADENTITIES'),
        synchronize: config.get<boolean>('DATABASE_SYNCHRONIZE'),
      }),
    }),
    TeacherModule,
    StudentModule,
    CourseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
