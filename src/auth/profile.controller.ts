import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtUser } from './auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { UserRole } from '../users/user-role.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller()
export class ProfileController {
  @Roles(UserRole.DOCTOR)
  @Get('doctor/profile')
  getDoctorProfile(@Req() request: { user: JwtUser }) {
    return {
      message: 'Doctor profile accessed successfully',
      user: request.user,
    };
  }

  @Roles(UserRole.PATIENT)
  @Get('patient/profile')
  getPatientProfile(@Req() request: { user: JwtUser }) {
    return {
      message: 'Patient profile accessed successfully',
      user: request.user,
    };
  }
}
