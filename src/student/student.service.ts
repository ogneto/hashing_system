import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {
  emptyArray() {
    throw new BadRequestException('There are no students in the database.');
  }

  notFound() {
    throw new NotFoundException(`I didn't find this student in the database.`);
  }

  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const newStudent = {
      student_name: createStudentDto.student_name,
      student_email: createStudentDto.student_email,
      student_passwordHash: createStudentDto.student_passwordHash,
    };

    await this.studentRepository.save(newStudent);

    return {
      message: 'Student created.',
      student_created: newStudent,
    };
  }

  async findAll() {
    const allStudents = await this.studentRepository.find();

    if (allStudents.length === 0) {
      return this.emptyArray();
    }

    return {
      message: 'All students:',
      students: allStudents,
    };
  }

  async findOne(id: string) {
    const allStudents = await this.studentRepository.find();

    if (allStudents.length === 0) {
      return this.emptyArray();
    }

    const student = await this.studentRepository.findOneBy({
      id,
    });

    if (!student) {
      return this.notFound();
    }

    return {
      message: `Student:`,
      student: student,
    };
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const allStudents = await this.studentRepository.find();

    if (allStudents.length === 0) {
      return this.emptyArray();
    }

    const student = {
      student_name: updateStudentDto?.student_name,
      student_email: updateStudentDto?.student_email,
      student_passwordHash: updateStudentDto?.student_passwordHash,
    };

    const updatedStudent = await this.studentRepository.preload({
      id,
      ...student,
    });

    if (!updatedStudent) {
      return this.notFound();
    }

    await this.studentRepository.save(updatedStudent);

    return {
      message: 'Studentd updated:',
      student_updated: updatedStudent,
    };
  }

  async remove(id: string) {
    const allStudents = await this.studentRepository.find();

    if (allStudents.length === 0) {
      return this.emptyArray();
    }

    const student = await this.studentRepository.findOneBy({
      id,
    });

    if (!student) {
      return this.notFound();
    }

    const removeStudent = await this.studentRepository.remove(student);
    return {
      message: 'This studentd was deleted:',
      student_deleted: student,
    };
  }
}
