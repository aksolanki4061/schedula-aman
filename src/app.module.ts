import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { DoctorProfile } from './doctor/doctor-profile.entity';
import { PatientProfile } from './patient/patient-profile.entity';
import { RecurringAvailability } from './doctor/recurring-availability.entity';
import { CustomAvailability } from './doctor/custom-availability.entity';
import { Appointment } from './doctor/appointment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      // Use DATABASE_URL if available (for Neon/production),
      // otherwise fall back to local DB credentials
      url: process.env.DATABASE_URL,
      host: process.env.DATABASE_URL ? undefined : (process.env.DB_HOST ?? 'localhost'),
      port: process.env.DATABASE_URL ? undefined : Number(process.env.DB_PORT ?? 5432),
      username: process.env.DATABASE_URL ? undefined : (process.env.DB_USERNAME ?? 'postgres'),
      password: process.env.DATABASE_URL ? undefined : (process.env.DB_PASSWORD ?? 'nama2004'),
      database: process.env.DATABASE_URL ? undefined : (process.env.DB_DATABASE ?? 'schedula'),
      entities: [
        User,
        DoctorProfile,
        PatientProfile,
        RecurringAvailability,
        CustomAvailability,
        Appointment,
      ],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      synchronize: false,
      // Only enable SSL for remote databases (Neon), not for local PostgreSQL
      ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
    }),
    AuthModule,
    DoctorModule,
    PatientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

