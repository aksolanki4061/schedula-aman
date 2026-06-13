import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DoctorProfile } from './doctor-profile.entity';
import { PatientProfile } from '../patient/patient-profile.entity';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'doctor_id' })
  doctorId: number;

  @ManyToOne(() => DoctorProfile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'doctor_id' })
  doctor: DoctorProfile;

  @Column({ name: 'patient_id', nullable: true }) // nullable for now just in case
  patientId: number;

  @ManyToOne(() => PatientProfile, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'patient_id' })
  patient: PatientProfile;

  @Column({ name: 'date', type: 'date' })
  date: string; // Format: "YYYY-MM-DD"

  @Column({ name: 'start_time', type: 'varchar', length: 5 })
  startTime: string; // Format: "HH:MM"

  @Column({ name: 'end_time', type: 'varchar', length: 5 })
  endTime: string; // Format: "HH:MM"

  @Column({ name: 'status', default: 'booked' })
  status: string; // e.g., 'booked', 'cancelled', 'completed'

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
