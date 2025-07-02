import { forwardRef, Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { StudentModule } from 'src/student/student.module';
import { HashingService } from './hashing/hashing.service';
import { BycryptService } from './hashing/bcrypt.service';

@Global()
@Module({
  imports: [forwardRef(() => StudentModule)],
  providers: [
    AuthService,
    {
      provide: HashingService,
      useClass: BycryptService,
    },
  ],
  controllers: [AuthController],
  exports: [HashingService],
})
export class AuthModule {}
