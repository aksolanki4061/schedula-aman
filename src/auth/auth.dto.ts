import { UserRole } from '../users/user-role.enum';

export class SignupDto {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export class LoginDto {
  email: string;
  password: string;
}

export interface JwtUser {
  sub: number;
  email: string;
  role: UserRole;
}
