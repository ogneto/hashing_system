import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CourseService {
  emptyArray() {
    throw new BadRequestException('There are no courses in the Database');
  }

  NotFound() {
    throw new NotFoundException(`I didn't find this course in the Database`);
  }

  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    const course = {
      course_name: createCourseDto.course_name,
    };
    const newCourse = await this.courseRepository.save(course);
    return {
      message: 'This course was created.',
      course_created: course,
    };
  }

  async findAll() {
    const allCourses = await this.courseRepository.find();

    if (allCourses.length === 0) {
      return this.emptyArray();
    }

    return {
      message: 'Courses:',
      allCourses,
    };
  }

  async findOne(id: string) {
    const allCourses = await this.courseRepository.find();

    if (allCourses.length === 0) {
      return this.emptyArray();
    }

    const course = await this.courseRepository.findOneBy({
      id,
    });

    if (!course) {
      return this.NotFound();
    }

    return {
      message: `Course:`,
      course,
    };
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const allCourses = await this.courseRepository.find();

    if (allCourses.length === 0) {
      return this.emptyArray();
    }

    const course = {
      course_name: updateCourseDto?.course_name,
    };

    const updatedCourse = await this.courseRepository.preload({
      id,
      ...course,
    });

    if (!updatedCourse) {
      return this.NotFound();
    }

    await this.courseRepository.save(updatedCourse);

    return {
      message: 'This course was updated',
      course_updated: updatedCourse,
    };
  }

  async remove(id: string) {
    const allCourses = await this.courseRepository.find();

    if (allCourses.length === 0) {
      return this.emptyArray();
    }

    const course = await this.courseRepository.findOneBy({
      id,
    });

    if (!course) {
      return this.NotFound();
    }

    const deleteCourse = await this.courseRepository.remove(course);
    return {
      message: 'This course was deleted.',
      course_deleted: course,
    };
  }
}
