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
export class Teacher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 20 })
  teacher_name: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  teacher_email: string;

  @Column({ type: 'varchar', length: 50 })
  teacher_passwordHash: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedtAt: string;

  @ManyToOne(() => Course, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'course_id' })
  course: Course;
}
