export class CreateDoctorProfileDto {
  fullName: string;
  specialization: string;
  experience: number;
  qualification: string;
  consultationFee: number;
  availability: Record<string, unknown>;
  profileDetails?: string;
}

export class UpdateDoctorProfileDto {
  fullName?: string;
  specialization?: string;
  experience?: number;
  qualification?: string;
  consultationFee?: number;
  availability?: Record<string, unknown>;
  profileDetails?: string | null;
}
