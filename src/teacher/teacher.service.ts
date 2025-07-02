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

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}

  emptyArray() {
    throw new BadRequestException('There are no teachers in the database.');
  }

  notFound() {
    throw new NotFoundException(`I didn't find this teacher in the database.`);
  }

  async create(createTeacherDto: CreateTeacherDto) {
    const teacher = {
      teacher_name: createTeacherDto.teacher_name,
      teacher_email: createTeacherDto.teacher_email,
      teacher_passwordHash: createTeacherDto.teacher_passwordHash,
    };

    await this.teacherRepository.save(teacher);

    return {
      message: 'This teacher was created:',
      teacher: teacher,
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
}
