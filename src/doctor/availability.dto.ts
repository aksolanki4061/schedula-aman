// ---- Recurring Availability DTOs ----

export class CreateRecurringAvailabilityDto {
  /** 0=Sunday, 1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday, 5=Friday, 6=Saturday */
  dayOfWeek: number;

  /** Format: "HH:MM" (24-hour) e.g. "09:00" */
  startTime: string;

  /** Format: "HH:MM" (24-hour) e.g. "13:00" */
  endTime: string;
}

export class UpdateRecurringAvailabilityDto {
  dayOfWeek?: number;
  startTime?: string;
  endTime?: string;
}

// ---- Custom (Override) Availability DTOs ----

export class CreateCustomAvailabilityDto {
  /** Format: "YYYY-MM-DD" e.g. "2026-06-15" */
  date: string;

  /** Format: "HH:MM" (24-hour) e.g. "14:00" */
  startTime: string;

  /** Format: "HH:MM" (24-hour) e.g. "16:00" */
  endTime: string;
}
