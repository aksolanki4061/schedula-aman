import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DoctorProfile } from '../doctor/doctor-profile.entity';
import { PatientProfile } from '../patient/patient-profile.entity';
import { UserRole } from './user-role.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;

  @OneToOne(() => DoctorProfile, (doctorProfile) => doctorProfile.user)
  doctorProfile?: DoctorProfile;

  @OneToOne(() => PatientProfile, (patientProfile) => patientProfile.user)
  patientProfile?: PatientProfile;
}
