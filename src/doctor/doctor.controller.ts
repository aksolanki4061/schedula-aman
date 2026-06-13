import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtUser } from '../auth/auth.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { UserRole } from '../users/user-role.enum';
import {
  CreateDoctorProfileDto,
  UpdateDoctorProfileDto,
} from './doctor-profile.dto';
import { DoctorService } from './doctor.service';
import { AvailabilityService } from './availability.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.DOCTOR)
@Controller('doctor')
export class DoctorController {
  constructor(
    private readonly doctorService: DoctorService,
    private readonly availabilityService: AvailabilityService,
  ) {}

  @Post('profile')
  createProfile(
    @Req() request: { user: JwtUser },
    @Body() createDoctorProfileDto: CreateDoctorProfileDto,
  ) {
    return this.doctorService.createProfile(
      request.user.sub,
      createDoctorProfileDto,
    );
  }

  @Get('profile')
  getProfile(@Req() request: { user: JwtUser }) {
    return this.doctorService.getProfile(request.user.sub);
  }

  @Patch('profile')
  updateProfile(
    @Req() request: { user: JwtUser },
    @Body() updateDoctorProfileDto: UpdateDoctorProfileDto,
  ) {
    return this.doctorService.updateProfile(
      request.user.sub,
      updateDoctorProfileDto,
    );
  }

  @Get()
  @Roles(UserRole.PATIENT, UserRole.DOCTOR)
  getDoctors(
    @Query()
    query: {
      specialization?: string;
      search?: string;
      page?: string;
      limit?: string;
      availability?: string;
    },
  ) {
    return this.doctorService.getDoctors(query);
  }

  @Get(':id')
  @Roles(UserRole.PATIENT, UserRole.DOCTOR)
  getDoctorById(@Param('id') id: string) {
    return this.doctorService.getDoctorById(id);
  }

  @Get(':id/slots')
  @Roles(UserRole.PATIENT, UserRole.DOCTOR)
  getDoctorSlots(
    @Param('id') id: string,
    @Query('date') date: string,
    @Query('duration') duration?: string,
  ) {
    const durationMinutes = duration ? parseInt(duration, 10) : 15;
    return this.availabilityService.getAvailableSlotsForPatient(+id, date, durationMinutes);
  }
}
