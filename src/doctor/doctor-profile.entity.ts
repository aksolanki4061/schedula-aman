import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('doctor_profiles')
export class DoctorProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', unique: true })
  userId: number;

  @OneToOne(() => User, (user) => user.doctorProfile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column()
  specialization: string;

  @Column()
  experience: number;

  @Column()
  qualification: string;

  @Column({
    name: 'consultation_fee',
    type: 'numeric',
    precision: 10,
    scale: 2,
  })
  consultationFee: string;

  @Column({ name: 'availability', type: 'jsonb' })
  availability: Record<string, unknown>;

  @Column({ name: 'profile_details', type: 'text', nullable: true })
  profileDetails?: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
