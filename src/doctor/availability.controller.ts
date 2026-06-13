import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
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
  CreateCustomAvailabilityDto,
  CreateRecurringAvailabilityDto,
  UpdateRecurringAvailabilityDto,
} from './availability.dto';
import { AvailabilityService } from './availability.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.DOCTOR)
@Controller('doctor/availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  // ─── Recurring Availability ───────────────────────────────

  /** POST /doctor/availability – Add a recurring weekly slot */
  @Post()
  createRecurring(
    @Req() req: { user: JwtUser },
    @Body() dto: CreateRecurringAvailabilityDto,
  ) {
    return this.availabilityService.createRecurring(req.user.sub, dto);
  }

  /** GET /doctor/availability – List all recurring slots */
  @Get()
  getRecurring(@Req() req: { user: JwtUser }) {
    return this.availabilityService.getRecurring(req.user.sub);
  }

  /** PATCH /doctor/availability/:id – Update a recurring slot */
  @Patch(':id')
  updateRecurring(
    @Req() req: { user: JwtUser },
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRecurringAvailabilityDto,
  ) {
    return this.availabilityService.updateRecurring(req.user.sub, id, dto);
  }

  /** DELETE /doctor/availability/:id – Remove a recurring slot */
  @Delete(':id')
  deleteRecurring(
    @Req() req: { user: JwtUser },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.availabilityService.deleteRecurring(req.user.sub, id);
  }

  // ─── Custom Override ─────────────────────────────────────

  /** POST /doctor/availability/override – Add a custom date override */
  @Post('override')
  createOverride(
    @Req() req: { user: JwtUser },
    @Body() dto: CreateCustomAvailabilityDto,
  ) {
    return this.availabilityService.createCustomOverride(req.user.sub, dto);
  }

  /** GET /doctor/availability/date?date=YYYY-MM-DD – Get slots for a date */
  @Get('date')
  getByDate(@Req() req: { user: JwtUser }, @Query('date') date: string) {
    return this.availabilityService.getAvailabilityByDate(req.user.sub, date);
  }
}
