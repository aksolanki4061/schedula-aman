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

@Entity('custom_availability')
export class CustomAvailability {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'doctor_id' })
  doctorId: number;

  @ManyToOne(() => DoctorProfile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'doctor_id' })
  doctor: DoctorProfile;

  // Format: "YYYY-MM-DD"
  @Column({ name: 'date', type: 'date' })
  date: string;

  // Format: "HH:MM"
  @Column({ name: 'start_time', type: 'varchar', length: 5 })
  startTime: string;

  @Column({ name: 'end_time', type: 'varchar', length: 5 })
  endTime: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
