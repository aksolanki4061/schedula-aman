import { Body, Controller, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtUser } from '../auth/auth.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { UserRole } from '../users/user-role.enum';
import {
  CreatePatientProfileDto,
  UpdatePatientProfileDto,
} from './patient-profile.dto';
import { PatientService } from './patient.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.PATIENT)
@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post('profile')
  createProfile(
    @Req() request: { user: JwtUser },
    @Body() createPatientProfileDto: CreatePatientProfileDto,
  ) {
    return this.patientService.createProfile(
      request.user.sub,
      createPatientProfileDto,
    );
  }

  @Get('profile')
  getProfile(@Req() request: { user: JwtUser }) {
    return this.patientService.getProfile(request.user.sub);
  }

  @Patch('profile')
  updateProfile(
    @Req() request: { user: JwtUser },
    @Body() updatePatientProfileDto: UpdatePatientProfileDto,
  ) {
    return this.patientService.updateProfile(
      request.user.sub,
      updatePatientProfileDto,
    );
  }
}
