import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { DoctorProfile } from './doctor-profile.entity';
import { DoctorService } from './doctor.service';

describe('DoctorService', () => {
  let service: DoctorService;

  const mockQueryBuilder = {
    andWhere: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    getMany: jest.fn(),
  };

  const mockRepository = {
    createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DoctorService,
        {
          provide: getRepositoryToken(DoctorProfile),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<DoctorService>(DoctorService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getDoctors', () => {
    it('should throw BadRequestException if page is negative', async () => {
      await expect(service.getDoctors({ page: '-1' })).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if limit is negative', async () => {
      await expect(service.getDoctors({ limit: '-10' })).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if page is not integer', async () => {
      await expect(service.getDoctors({ page: '1.5' })).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if specialization is empty', async () => {
      await expect(
        service.getDoctors({ specialization: '   ' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if search is empty', async () => {
      await expect(service.getDoctors({ search: '   ' })).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if availability value is invalid', async () => {
      await expect(
        service.getDoctors({ availability: 'maybe' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should return successfully with default pagination and mapped fields', async () => {
      const mockDoctors = [
        {
          id: 1,
          fullName: 'Dr. Sarah',
          specialization: 'Cardiology',
          experience: 10,
          consultationFee: '150.00',
          availability: { Monday: '09:00-17:00' },
        },
        {
          id: 2,
          fullName: 'Dr. John',
          specialization: 'Pediatrics',
          experience: 5,
          consultationFee: '100.00',
          availability: {},
        },
      ];

      mockQueryBuilder.getMany.mockResolvedValue(mockDoctors);

      const result = await service.getDoctors({});

      expect(mockRepository.createQueryBuilder).toHaveBeenCalledWith('doctor');
      expect(mockQueryBuilder.skip).toHaveBeenCalledWith(0);
      expect(mockQueryBuilder.take).toHaveBeenCalledWith(10);
      expect(result).toEqual([
        {
          id: 1,
          fullName: 'Dr. Sarah',
          specialization: 'Cardiology',
          experience: 10,
          consultationFee: '150.00',
          availabilityStatus: true,
        },
        {
          id: 2,
          fullName: 'Dr. John',
          specialization: 'Pediatrics',
          experience: 5,
          consultationFee: '100.00',
          availabilityStatus: false,
        },
      ]);
    });

    it('should apply filters correctly', async () => {
      mockQueryBuilder.getMany.mockResolvedValue([]);

      await service.getDoctors({
        specialization: 'Cardiology',
        search: 'Sarah',
        availability: 'true',
      });

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'doctor.specialization ILIKE :specialization',
        { specialization: '%Cardiology%' },
      );
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'doctor.fullName ILIKE :search',
        { search: '%Sarah%' },
      );
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        "doctor.availability != '{}'::jsonb",
      );
    });
  });

  describe('getDoctorById', () => {
    it('should throw BadRequestException if ID is invalid', async () => {
      await expect(service.getDoctorById('abc')).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.getDoctorById('-5')).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.getDoctorById('1.5')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw NotFoundException if doctor does not exist', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      await expect(service.getDoctorById('999')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should return doctor details if found', async () => {
      const mockDoctor = {
        id: 1,
        fullName: 'Dr. Sarah',
        specialization: 'Cardiology',
        experience: 10,
        consultationFee: '150.00',
        availability: { Monday: '09:00-17:00' },
      };

      mockRepository.findOne.mockResolvedValue(mockDoctor);

      const result = await service.getDoctorById('1');

      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual({
        ...mockDoctor,
        availabilityStatus: true,
      });
    });
  });
});
