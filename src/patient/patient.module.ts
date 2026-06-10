import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientController } from './patient.controller';
import { PatientProfile } from './patient-profile.entity';
import { PatientService } from './patient.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([PatientProfile]), AuthModule],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
