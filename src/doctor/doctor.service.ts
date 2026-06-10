import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorProfile } from './doctor-profile.entity';
import {
  CreateDoctorProfileDto,
  UpdateDoctorProfileDto,
} from './doctor-profile.dto';

@Injectable()
export class DoctorService {
  private readonly restrictedFields = new Set([
    'id',
    'userId',
    'user',
    'createdAt',
    'updatedAt',
  ]);

  constructor(
    @InjectRepository(DoctorProfile)
    private readonly doctorProfilesRepository: Repository<DoctorProfile>,
  ) {}

  async createProfile(userId: number, dto: CreateDoctorProfileDto) {
    this.validateCreateDto(dto);

    const existingProfile = await this.doctorProfilesRepository.findOne({
      where: { userId },
    });
    if (existingProfile) {
      throw new ConflictException('doctor profile already exists');
    }

    const profile = this.doctorProfilesRepository.create({
      userId,
      fullName: dto.fullName.trim(),
      specialization: dto.specialization.trim(),
      experience: dto.experience,
      qualification: dto.qualification.trim(),
      consultationFee: dto.consultationFee.toFixed(2),
      availability: dto.availability,
      profileDetails: this.optionalTrim(dto.profileDetails),
    });

    return this.doctorProfilesRepository.save(profile);
  }

  async getProfile(userId: number) {
    const profile = await this.doctorProfilesRepository.findOne({
      where: { userId },
    });
    if (!profile) {
      throw new NotFoundException('doctor profile not found');
    }

    return profile;
  }

  async updateProfile(userId: number, dto: UpdateDoctorProfileDto) {
    this.validateUpdateDto(dto);

    const profile = await this.getProfile(userId);
    const updates: Partial<DoctorProfile> = {};

    if (dto.fullName !== undefined) updates.fullName = dto.fullName.trim();
    if (dto.specialization !== undefined)
      updates.specialization = dto.specialization.trim();
    if (dto.experience !== undefined) updates.experience = dto.experience;
    if (dto.qualification !== undefined)
      updates.qualification = dto.qualification.trim();
    if (dto.consultationFee !== undefined) {
      updates.consultationFee = dto.consultationFee.toFixed(2);
    }
    if (dto.availability !== undefined) updates.availability = dto.availability;
    if (dto.profileDetails !== undefined) {
      updates.profileDetails =
        dto.profileDetails === null
          ? null
          : this.optionalTrim(dto.profileDetails);
    }

    Object.assign(profile, updates);
    return this.doctorProfilesRepository.save(profile);
  }

  async getDoctors(query: {
    specialization?: string;
    search?: string;
    page?: string;
    limit?: string;
    availability?: string;
  }) {
    let pageNum = 1;
    let limitNum = 10;

    // Validate page
    if (query.page !== undefined) {
      const pageStr = String(query.page).trim();
      pageNum = Number(pageStr);
      if (
        !/^\d+$/.test(pageStr) ||
        !Number.isInteger(pageNum) ||
        pageNum <= 0
      ) {
        throw new BadRequestException('page must be a positive integer');
      }
    }

    // Validate limit
    if (query.limit !== undefined) {
      const limitStr = String(query.limit).trim();
      limitNum = Number(limitStr);
      if (
        !/^\d+$/.test(limitStr) ||
        !Number.isInteger(limitNum) ||
        limitNum <= 0
      ) {
        throw new BadRequestException('limit must be a positive integer');
      }
    }

    // Validate specialization
    if (query.specialization !== undefined) {
      if (
        typeof query.specialization !== 'string' ||
        query.specialization.trim().length === 0
      ) {
        throw new BadRequestException(
          'specialization must be a non-empty string',
        );
      }
    }

    // Validate search
    if (query.search !== undefined) {
      if (
        typeof query.search !== 'string' ||
        query.search.trim().length === 0
      ) {
        throw new BadRequestException('search must be a non-empty string');
      }
    }

    // Validate availability
    let isAvailable: boolean | undefined;
    if (query.availability !== undefined) {
      if (query.availability === 'true') {
        isAvailable = true;
      } else if (query.availability === 'false') {
        isAvailable = false;
      } else {
        throw new BadRequestException('availability must be a boolean');
      }
    }

    const queryBuilder =
      this.doctorProfilesRepository.createQueryBuilder('doctor');

    if (query.specialization !== undefined) {
      queryBuilder.andWhere('doctor.specialization ILIKE :specialization', {
        specialization: `%${query.specialization.trim()}%`,
      });
    }

    if (query.search !== undefined) {
      queryBuilder.andWhere('doctor.fullName ILIKE :search', {
        search: `%${query.search.trim()}%`,
      });
    }

    if (isAvailable !== undefined) {
      if (isAvailable) {
        queryBuilder.andWhere("doctor.availability != '{}'::jsonb");
      } else {
        queryBuilder.andWhere("doctor.availability = '{}'::jsonb");
      }
    }

    // Pagination
    queryBuilder.skip((pageNum - 1) * limitNum).take(limitNum);

    // Stable sorting by ID
    queryBuilder.orderBy('doctor.id', 'ASC');

    const doctors = await queryBuilder.getMany();

    return doctors.map((doctor) => {
      const availabilityStatus =
        Object.keys(doctor.availability || {}).length > 0;
      return {
        id: doctor.id,
        fullName: doctor.fullName,
        specialization: doctor.specialization,
        experience: doctor.experience,
        consultationFee: doctor.consultationFee,
        availabilityStatus,
      };
    });
  }

  async getDoctorById(idParam: unknown) {
    const idStr = String(idParam).trim();
    const id = Number(idStr);
    if (!/^\d+$/.test(idStr) || !Number.isInteger(id) || id <= 0) {
      throw new BadRequestException('invalid doctor ID');
    }

    const doctor = await this.doctorProfilesRepository.findOne({
      where: { id },
    });

    if (!doctor) {
      throw new NotFoundException('doctor profile not found');
    }

    const availabilityStatus =
      Object.keys(doctor.availability || {}).length > 0;

    return {
      ...doctor,
      availabilityStatus,
    };
  }

  private validateCreateDto(dto: CreateDoctorProfileDto) {
    this.ensurePlainObject(dto);

    this.validateString(dto.fullName, 'fullName');
    this.validateString(dto.specialization, 'specialization');
    this.validateNonNegativeInteger(dto.experience, 'experience');
    this.validateString(dto.qualification, 'qualification');
    this.validatePositiveNumber(dto.consultationFee, 'consultationFee');
    this.validateObject(dto.availability, 'availability');

    if (dto.profileDetails !== undefined) {
      this.validateString(dto.profileDetails, 'profileDetails');
    }
  }

  private validateUpdateDto(dto: UpdateDoctorProfileDto) {
    this.ensurePlainObject(dto);
    this.rejectRestrictedFields(dto);

    if (Object.keys(dto).length === 0) {
      throw new BadRequestException('at least one field is required');
    }

    if (dto.fullName !== undefined)
      this.validateString(dto.fullName, 'fullName');
    if (dto.specialization !== undefined) {
      this.validateString(dto.specialization, 'specialization');
    }
    if (dto.experience !== undefined) {
      this.validateNonNegativeInteger(dto.experience, 'experience');
    }
    if (dto.qualification !== undefined) {
      this.validateString(dto.qualification, 'qualification');
    }
    if (dto.consultationFee !== undefined) {
      this.validatePositiveNumber(dto.consultationFee, 'consultationFee');
    }
    if (dto.availability !== undefined) {
      this.validateObject(dto.availability, 'availability');
    }
    if (dto.profileDetails !== undefined && dto.profileDetails !== null) {
      this.validateString(dto.profileDetails, 'profileDetails');
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

  private validateNonNegativeInteger(value: unknown, field: string) {
    if (typeof value !== 'number' || !Number.isInteger(value) || value < 0) {
      throw new BadRequestException(`${field} must be a non-negative integer`);
    }
  }

  private validatePositiveNumber(value: unknown, field: string) {
    if (typeof value !== 'number' || !Number.isFinite(value) || value <= 0) {
      throw new BadRequestException(`${field} must be a positive number`);
    }
  }

  private validateObject(value: unknown, field: string) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      throw new BadRequestException(`${field} must be an object`);
    }
  }

  private optionalTrim(value: string | undefined) {
    if (value === undefined) {
      return undefined;
    }

    return value.trim();
  }
}
