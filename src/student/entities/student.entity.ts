import {
  Column,
  CreateDateColumn,
  Entity,
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

  @Column({ type: 'varchar', length: 50 })
  student_passwordHash: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedtAt: string;
}
