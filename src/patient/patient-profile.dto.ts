export class CreatePatientProfileDto {
  fullName: string;
  age: number;
  gender: string;
  contactDetails: Record<string, unknown>;
  basicHealthInformation?: Record<string, unknown>;
}

export class UpdatePatientProfileDto {
  fullName?: string;
  age?: number;
  gender?: string;
  contactDetails?: Record<string, unknown>;
  basicHealthInformation?: Record<string, unknown> | null;
}
