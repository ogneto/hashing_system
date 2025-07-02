import { Course } from 'src/course/entities/course.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 20 })
  student_name: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  student_email: string;

  @Column({ type: 'varchar' })
  student_passwordHash: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedtAt: string;

  @ManyToOne(() => Course, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'course_id' })
  course: Course;
}
