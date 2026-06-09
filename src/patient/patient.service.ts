import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatientProfile } from './patient-profile.entity';
import {
  CreatePatientProfileDto,
  UpdatePatientProfileDto,
} from './patient-profile.dto';

@Injectable()
export class PatientService {
  private readonly restrictedFields = new Set([
    'id',
    'userId',
    'user',
    'createdAt',
    'updatedAt',
  ]);

  constructor(
    @InjectRepository(PatientProfile)
    private readonly patientProfilesRepository: Repository<PatientProfile>,
  ) {}

  async createProfile(userId: number, dto: CreatePatientProfileDto) {
    this.validateCreateDto(dto);

    const existingProfile = await this.patientProfilesRepository.findOne({
      where: { userId },
    });
    if (existingProfile) {
      throw new ConflictException('patient profile already exists');
    }

    const profile = this.patientProfilesRepository.create({
      userId,
      fullName: dto.fullName.trim(),
      age: dto.age,
      gender: dto.gender.trim(),
      contactDetails: dto.contactDetails,
      basicHealthInformation: dto.basicHealthInformation ?? null,
    });

    return this.patientProfilesRepository.save(profile);
  }

  async getProfile(userId: number) {
    const profile = await this.patientProfilesRepository.findOne({
      where: { userId },
    });
    if (!profile) {
      throw new NotFoundException('patient profile not found');
    }

    return profile;
  }

  async updateProfile(userId: number, dto: UpdatePatientProfileDto) {
    this.validateUpdateDto(dto);

    const profile = await this.getProfile(userId);
    const updates: Partial<PatientProfile> = {};

    if (dto.fullName !== undefined) updates.fullName = dto.fullName.trim();
    if (dto.age !== undefined) updates.age = dto.age;
    if (dto.gender !== undefined) updates.gender = dto.gender.trim();
    if (dto.contactDetails !== undefined)
      updates.contactDetails = dto.contactDetails;
    if (dto.basicHealthInformation !== undefined) {
      updates.basicHealthInformation = dto.basicHealthInformation;
    }

    Object.assign(profile, updates);
    return this.patientProfilesRepository.save(profile);
  }

  private validateCreateDto(dto: CreatePatientProfileDto) {
    this.ensurePlainObject(dto);

    this.validateString(dto.fullName, 'fullName');
    this.validatePositiveInteger(dto.age, 'age');
    this.validateString(dto.gender, 'gender');
    this.validateObject(dto.contactDetails, 'contactDetails');

    if (dto.basicHealthInformation !== undefined) {
      this.validateObject(dto.basicHealthInformation, 'basicHealthInformation');
    }
  }

  private validateUpdateDto(dto: UpdatePatientProfileDto) {
    this.ensurePlainObject(dto);
    this.rejectRestrictedFields(dto);

    if (Object.keys(dto).length === 0) {
      throw new BadRequestException('at least one field is required');
    }

    if (dto.fullName !== undefined)
      this.validateString(dto.fullName, 'fullName');
    if (dto.age !== undefined) this.validatePositiveInteger(dto.age, 'age');
    if (dto.gender !== undefined) this.validateString(dto.gender, 'gender');
    if (dto.contactDetails !== undefined) {
      this.validateObject(dto.contactDetails, 'contactDetails');
    }
    if (
      dto.basicHealthInformation !== undefined &&
      dto.basicHealthInformation !== null
    ) {
      this.validateObject(dto.basicHealthInformation, 'basicHealthInformation');
    }
  }

  private ensurePlainObject(value: unknown) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      throw new BadRequestException('request body must be an object');
    }
  }

  private rejectRestrictedFields(dto: object) {
    for (const field of Object.keys(dto)) {
      if (this.restrictedFields.has(field)) {
        throw new BadRequestException(`${field} cannot be updated`);
      }
    }
  }

  private validateString(value: unknown, field: string) {
    if (typeof value !== 'string' || value.trim().length === 0) {
      throw new BadRequestException(`${field} must be a non-empty string`);
    }
  }

  private validatePositiveInteger(value: unknown, field: string) {
    if (typeof value !== 'number' || !Number.isInteger(value) || value <= 0) {
      throw new BadRequestException(`${field} must be a positive integer`);
    }
  }

  private validateObject(value: unknown, field: string) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      throw new BadRequestException(`${field} must be an object`);
    }
  }
}
