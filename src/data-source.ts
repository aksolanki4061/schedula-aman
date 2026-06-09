import { DataSource } from 'typeorm';
import { DoctorProfile } from './doctor/doctor-profile.entity';
import { PatientProfile } from './patient/patient-profile.entity';
import { User } from './users/user.entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'postgres',
  database: process.env.DB_DATABASE ?? 'schedula',
  entities: [User, DoctorProfile, PatientProfile],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
});
