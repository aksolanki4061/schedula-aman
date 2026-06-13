import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { AvailabilityController } from './availability.controller';
import { AvailabilityService } from './availability.service';
import { CustomAvailability } from './custom-availability.entity';
import { DoctorController } from './doctor.controller';
import { DoctorProfile } from './doctor-profile.entity';
import { DoctorService } from './doctor.service';
import { RecurringAvailability } from './recurring-availability.entity';
import { Appointment } from './appointment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DoctorProfile,
      RecurringAvailability,
      CustomAvailability,
      Appointment,
    ]),
    AuthModule,
  ],
  controllers: [DoctorController, AvailabilityController],
  providers: [DoctorService, AvailabilityService],
})
export class DoctorModule {}
