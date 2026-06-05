import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UserRole } from '../users/user-role.enum';
import { User } from '../users/user.entity';

describe('AuthService', () => {
  let service: AuthService;
  const users: User[] = [];
  const usersService = {
    create: jest.fn((user: Omit<User, 'id'>) => {
      const newUser = { id: users.length + 1, ...user };
      users.push(newUser);
      return Promise.resolve(newUser);
    }),
    findByEmail: jest.fn((email: string) => {
      return Promise.resolve(
        users.find((user) => user.email === email) ?? null,
      );
    }),
    isValidRole: jest.fn((role: string) => {
      return Object.values(UserRole).includes(role as UserRole);
    }),
  };

  beforeEach(async () => {
    users.length = 0;
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'test-secret',
        }),
      ],
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: usersService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('signs up a user with a role and returns a token', async () => {
    const result = await service.signup({
      name: 'Aman Doctor',
      email: 'doctor@example.com',
      password: 'password123',
      role: UserRole.DOCTOR,
    });

    expect(result.accessToken).toEqual(expect.any(String));
    expect(result.user).toMatchObject({
      email: 'doctor@example.com',
      role: UserRole.DOCTOR,
    });
    expect(result.user).not.toHaveProperty('password');
  });

  it('logs in a registered user', async () => {
    await service.signup({
      name: 'Aman Patient',
      email: 'patient@example.com',
      password: 'password123',
      role: UserRole.PATIENT,
    });

    const result = await service.login({
      email: 'patient@example.com',
      password: 'password123',
    });

    expect(result.accessToken).toEqual(expect.any(String));
    expect(result.user.role).toBe(UserRole.PATIENT);
  });
});
