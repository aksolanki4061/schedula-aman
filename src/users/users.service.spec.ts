import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from './user-role.enum';
import { User } from './user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let repository: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    const repositoryMock = {
      create: jest.fn((user: Omit<User, 'id'>) => ({ id: 1, ...user })),
      save: jest.fn((user: User) => Promise.resolve(user)),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('creates a user through the repository', async () => {
    const result = await service.create({
      name: 'Aman Doctor',
      email: 'doctor@example.com',
      password: 'hashed-password',
      role: UserRole.DOCTOR,
    });

    expect(repository.create.mock.calls[0][0]).toEqual({
      name: 'Aman Doctor',
      email: 'doctor@example.com',
      password: 'hashed-password',
      role: UserRole.DOCTOR,
    });
    expect(repository.save.mock.calls).toHaveLength(1);
    expect(result.id).toBe(1);
  });

  it('finds a user by email', async () => {
    await service.findByEmail('doctor@example.com');

    expect(repository.findOne.mock.calls[0][0]).toEqual({
      where: { email: 'doctor@example.com' },
    });
  });
});
