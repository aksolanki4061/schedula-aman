import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { LoginDto, SignupDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    const { name, email, password, role } = signupDto;

    if (!name || !email || !password || !role) {
      throw new BadRequestException(
        'name, email, password and role are required',
      );
    }

    if (!this.usersService.isValidRole(role)) {
      throw new BadRequestException('role must be DOCTOR or PATIENT');
    }

    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('email is already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersService.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return {
      user: this.withoutPassword(user),
      accessToken: await this.signToken(user.id, user.email, user.role),
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    if (!email || !password) {
      throw new BadRequestException('email and password are required');
    }

    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('invalid email or password');
    }

    return {
      user: this.withoutPassword(user),
      accessToken: await this.signToken(user.id, user.email, user.role),
    };
  }

  private withoutPassword(user: User): Omit<User, 'password'> {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  private signToken(
    userId: number,
    email: string,
    role: string,
  ): Promise<string> {
    return this.jwtService.signAsync({
      sub: userId,
      email,
      role,
    });
  }
}
