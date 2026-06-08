import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRole } from '../users/user-role.enum';

describe('AuthController', () => {
  let controller: AuthController;
  const authService = {
    signup: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: authService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('delegates signup to AuthService', () => {
    const dto = {
      name: 'Aman Doctor',
      email: 'doctor@example.com',
      password: 'password123',
      role: UserRole.DOCTOR,
    };

    void controller.signup(dto);

    expect(authService.signup).toHaveBeenCalledWith(dto);
  });
});
