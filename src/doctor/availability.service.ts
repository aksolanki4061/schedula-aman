import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateCustomAvailabilityDto,
  CreateRecurringAvailabilityDto,
  UpdateRecurringAvailabilityDto,
} from './availability.dto';
import { CustomAvailability } from './custom-availability.entity';
import { DoctorProfile } from './doctor-profile.entity';
import { RecurringAvailability } from './recurring-availability.entity';

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(RecurringAvailability)
    private readonly recurringRepo: Repository<RecurringAvailability>,
    @InjectRepository(CustomAvailability)
    private readonly customRepo: Repository<CustomAvailability>,
    @InjectRepository(DoctorProfile)
    private readonly doctorProfileRepo: Repository<DoctorProfile>,
  ) {}

  // ─────────────────────────────────────────────────────────
  // Helper: validate time format HH:MM and range
  // ─────────────────────────────────────────────────────────
  private validateTimeFormat(time: string, fieldName: string): void {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!regex.test(time)) {
      throw new BadRequestException(
        `${fieldName} must be in HH:MM format (24-hour), e.g. "09:00"`,
      );
    }
  }

  private validateTimeRange(startTime: string, endTime: string): void {
    if (startTime >= endTime) {
      throw new BadRequestException(
        `startTime (${startTime}) must be earlier than endTime (${endTime})`,
      );
    }
  }

  // Returns true if two time slots overlap
  private isOverlapping(
    aStart: string,
    aEnd: string,
    bStart: string,
    bEnd: string,
  ): boolean {
    return aStart < bEnd && bStart < aEnd;
  }

  // Fetch the doctor profile and verify ownership
  private async getDoctorProfile(userId: number): Promise<DoctorProfile> {
    const profile = await this.doctorProfileRepo.findOne({
      where: { userId },
    });
    if (!profile) {
      throw new NotFoundException(
        'Doctor profile not found. Please create your profile first.',
      );
    }
    return profile;
  }

  // ─────────────────────────────────────────────────────────
  // RECURRING AVAILABILITY
  // ─────────────────────────────────────────────────────────

  async createRecurring(
    userId: number,
    dto: CreateRecurringAvailabilityDto,
  ): Promise<RecurringAvailability> {
    // Validate day
    if (dto.dayOfWeek < 0 || dto.dayOfWeek > 6) {
      throw new BadRequestException('dayOfWeek must be between 0 (Sun) and 6 (Sat)');
    }

    // Validate time format and range
    this.validateTimeFormat(dto.startTime, 'startTime');
    this.validateTimeFormat(dto.endTime, 'endTime');
    this.validateTimeRange(dto.startTime, dto.endTime);

    const profile = await this.getDoctorProfile(userId);

    // Fetch existing slots for that day
    const existing = await this.recurringRepo.find({
      where: { doctorId: profile.id, dayOfWeek: dto.dayOfWeek },
    });

    // Check for exact duplicate
    const isDuplicate = existing.some(
      (s) => s.startTime === dto.startTime && s.endTime === dto.endTime,
    );
    if (isDuplicate) {
      throw new ConflictException('This exact time slot already exists for that day.');
    }

    // Check for overlap
    for (const slot of existing) {
      if (this.isOverlapping(dto.startTime, dto.endTime, slot.startTime, slot.endTime)) {
        throw new ConflictException(
          `Time slot overlaps with existing slot ${slot.startTime}–${slot.endTime}`,
        );
      }
    }

    const newSlot = this.recurringRepo.create({
      doctorId: profile.id,
      dayOfWeek: dto.dayOfWeek,
      startTime: dto.startTime,
      endTime: dto.endTime,
    });
    return this.recurringRepo.save(newSlot);
  }

  async getRecurring(userId: number): Promise<RecurringAvailability[]> {
    const profile = await this.getDoctorProfile(userId);
    return this.recurringRepo.find({
      where: { doctorId: profile.id },
      order: { dayOfWeek: 'ASC', startTime: 'ASC' },
    });
  }

  async updateRecurring(
    userId: number,
    id: number,
    dto: UpdateRecurringAvailabilityDto,
  ): Promise<RecurringAvailability> {
    const profile = await this.getDoctorProfile(userId);
    const slot = await this.recurringRepo.findOne({ where: { id } });

    if (!slot) throw new NotFoundException(`Availability slot #${id} not found`);
    if (slot.doctorId !== profile.id) {
      throw new UnauthorizedException('You can only update your own availability slots');
    }

    const updatedDay = dto.dayOfWeek ?? slot.dayOfWeek;
    const updatedStart = dto.startTime ?? slot.startTime;
    const updatedEnd = dto.endTime ?? slot.endTime;

    if (dto.dayOfWeek !== undefined && (dto.dayOfWeek < 0 || dto.dayOfWeek > 6)) {
      throw new BadRequestException('dayOfWeek must be between 0 (Sun) and 6 (Sat)');
    }
    if (dto.startTime) this.validateTimeFormat(dto.startTime, 'startTime');
    if (dto.endTime) this.validateTimeFormat(dto.endTime, 'endTime');
    this.validateTimeRange(updatedStart, updatedEnd);

    // Check conflicts with other slots (excluding current)
    const existing = await this.recurringRepo.find({
      where: { doctorId: profile.id, dayOfWeek: updatedDay },
    });
    for (const s of existing) {
      if (s.id === id) continue;
      if (this.isOverlapping(updatedStart, updatedEnd, s.startTime, s.endTime)) {
        throw new ConflictException(
          `Updated slot overlaps with existing slot ${s.startTime}–${s.endTime}`,
        );
      }
    }

    slot.dayOfWeek = updatedDay;
    slot.startTime = updatedStart;
    slot.endTime = updatedEnd;
    return this.recurringRepo.save(slot);
  }

  async deleteRecurring(userId: number, id: number): Promise<{ message: string }> {
    const profile = await this.getDoctorProfile(userId);
    const slot = await this.recurringRepo.findOne({ where: { id } });

    if (!slot) throw new NotFoundException(`Availability slot #${id} not found`);
    if (slot.doctorId !== profile.id) {
      throw new UnauthorizedException('You can only delete your own availability slots');
    }

    await this.recurringRepo.remove(slot);
    return { message: `Recurring slot #${id} deleted successfully` };
  }

  // ─────────────────────────────────────────────────────────
  // CUSTOM OVERRIDE AVAILABILITY
  // ─────────────────────────────────────────────────────────

  async createCustomOverride(
    userId: number,
    dto: CreateCustomAvailabilityDto,
  ): Promise<CustomAvailability> {
    // Validate date format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dto.date)) {
      throw new BadRequestException('date must be in YYYY-MM-DD format');
    }
    const parsedDate = new Date(dto.date);
    if (isNaN(parsedDate.getTime())) {
      throw new BadRequestException('Invalid date provided');
    }

    this.validateTimeFormat(dto.startTime, 'startTime');
    this.validateTimeFormat(dto.endTime, 'endTime');
    this.validateTimeRange(dto.startTime, dto.endTime);

    const profile = await this.getDoctorProfile(userId);

    // Check for duplicate override on same date+time
    const existing = await this.customRepo.find({
      where: { doctorId: profile.id, date: dto.date },
    });

    const isDuplicate = existing.some(
      (s) => s.startTime === dto.startTime && s.endTime === dto.endTime,
    );
    if (isDuplicate) {
      throw new ConflictException('This exact override slot already exists for that date.');
    }

    for (const s of existing) {
      if (this.isOverlapping(dto.startTime, dto.endTime, s.startTime, s.endTime)) {
        throw new ConflictException(
          `Override slot overlaps with existing override ${s.startTime}–${s.endTime} on ${dto.date}`,
        );
      }
    }

    const newSlot = this.customRepo.create({
      doctorId: profile.id,
      date: dto.date,
      startTime: dto.startTime,
      endTime: dto.endTime,
    });
    return this.customRepo.save(newSlot);
  }

  /**
   * Get availability for a specific date.
   * If custom overrides exist → return those (ignoring recurring).
   * Otherwise → return the recurring slots for that weekday.
   */
  async getAvailabilityByDate(
    userId: number,
    date: string,
  ): Promise<{
    source: 'custom' | 'recurring';
    date: string;
    slots: Array<{ startTime: string; endTime: string; id: number }>;
  }> {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw new BadRequestException('date query param must be in YYYY-MM-DD format');
    }
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      throw new BadRequestException('Invalid date provided');
    }

    const profile = await this.getDoctorProfile(userId);

    // Check custom overrides first
    const customSlots = await this.customRepo.find({
      where: { doctorId: profile.id, date },
      order: { startTime: 'ASC' },
    });

    if (customSlots.length > 0) {
      return {
        source: 'custom',
        date,
        slots: customSlots.map((s) => ({
          id: s.id,
          startTime: s.startTime,
          endTime: s.endTime,
        })),
      };
    }

    // Fall back to recurring availability for that weekday
    // getDay() returns 0=Sun, 1=Mon … 6=Sat
    const dayOfWeek = parsedDate.getDay();
    const recurringSlots = await this.recurringRepo.find({
      where: { doctorId: profile.id, dayOfWeek },
      order: { startTime: 'ASC' },
    });

    return {
      source: 'recurring',
      date,
      slots: recurringSlots.map((s) => ({
        id: s.id,
        startTime: s.startTime,
        endTime: s.endTime,
      })),
    };
  }
}
