import { Body, Controller, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
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

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.DOCTOR)
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

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
}
