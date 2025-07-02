import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { Repository } from 'typeorm';
import { CourseService } from 'src/course/course.service';
import { HashingService } from 'src/auth/hashing/hashing.service';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    private readonly courseService: CourseService,
    private readonly hashingService: HashingService,
  ) {}

  emptyArray() {
    throw new BadRequestException('There are no teachers in the database.');
  }

  notFound() {
    throw new NotFoundException(`I didn't find this teacher in the database.`);
  }

  async create(createTeacherDto: CreateTeacherDto) {
    const passwordHash = await this.hashingService.hash(
      createTeacherDto.teacher_passwordHash,
    );

    const { course_id } = createTeacherDto;
    const course = await this.courseService.findOne(course_id);

    if (!course) {
      return this.courseService.NotFound();
    }

    const teacher = {
      teacher_name: createTeacherDto.teacher_name,
      teacher_email: createTeacherDto.teacher_email,
      teacher_passwordHash: passwordHash,
      course,
    };

    await this.teacherRepository.save(teacher);

    return {
      message: 'This teacher was created:',
      teacher_name: teacher.teacher_name,
      teacher_course: teacher.course.course_name,
    };
  }

  async findAll() {
    const allteachers = await this.teacherRepository.find();

    if (allteachers.length === 0) {
      return this.emptyArray();
    }

    return {
      message: 'All teachers:',
      teachers: allteachers,
    };
  }

  async findOne(id: string) {
    const allteachers = await this.teacherRepository.find();

    if (allteachers.length === 0) {
      return this.emptyArray();
    }

    const teacher = await this.teacherRepository.findOneBy({
      id,
    });

    if (!teacher) {
      return this.notFound();
    }

    return {
      message: 'Teacher',
      teacher: teacher,
    };
  }

  async update(id: string, updateTeacherDto: UpdateTeacherDto) {
    const allteachers = await this.teacherRepository.find();

    if (allteachers.length === 0) {
      return this.emptyArray();
    }

    const teacher = {
      teacher_name: updateTeacherDto?.teacher_name,
      teacher_email: updateTeacherDto?.teacher_email,
      teacher_passwordHash: updateTeacherDto?.teacher_passwordHash,
    };

    const updatedTeacher = await this.teacherRepository.preload({
      id,
      ...teacher,
    });

    if (!updatedTeacher) {
      return this.notFound();
    }

    await this.teacherRepository.save(updatedTeacher);

    return {
      message: 'This teacher was updated:',
      updatedTeacher: updatedTeacher,
    };
  }

  async remove(id: string) {
    const allteachers = await this.teacherRepository.find();

    if (allteachers.length === 0) {
      return this.emptyArray();
    }

    const teacher = await this.teacherRepository.findOneBy({
      id,
    });

    if (!teacher) {
      return this.notFound();
    }

    const deleteTeacher = await this.teacherRepository.remove(teacher);

    return {
      message: 'This teacher was deleted:',
      deleted_teacher: teacher,
    };
  }

  async deleteAll() {
    const allteachers = await this.teacherRepository.find();
    await this.teacherRepository.remove(allteachers);

    return `All theachers were deleted.`;
  }

  async findByEmail(email: string) {
    const allteachers = await this.teacherRepository.find();
    if (allteachers.length === 0) {
      return this.emptyArray();
    }
    const teacher = await this.teacherRepository.findOneBy({
      teacher_email: email,
    });

    if (!teacher) {
      return this.notFound();
    }

    return teacher;
  }
}
