import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';

describe('DoctorController', () => {
  let controller: DoctorController;
  let service: DoctorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorController],
      providers: [
        {
          provide: DoctorService,
          useValue: {
            getDoctors: jest.fn(),
            getDoctorById: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DoctorController>(DoctorController);
    service = module.get<DoctorService>(DoctorService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getDoctors', () => {
    it('should call doctorService.getDoctors with query', async () => {
      const query = { specialization: 'Cardiology' };
      const expectedResult = [
        {
          id: 1,
          fullName: 'Dr. Sarah',
          specialization: 'Cardiology',
          experience: 5,
          consultationFee: '100.00',
          availabilityStatus: true,
        },
      ];
      jest.spyOn(service, 'getDoctors').mockResolvedValue(expectedResult);

      const result = await controller.getDoctors(query);

      expect(service['getDoctors']).toHaveBeenCalledWith(query);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getDoctorById', () => {
    it('should call doctorService.getDoctorById with ID', async () => {
      const id = '1';
      const expectedResult = {
        id: 1,
        fullName: 'Dr. Sarah',
        specialization: 'Cardiology',
        experience: 5,
        consultationFee: '100.00',
        availabilityStatus: true,
      };
      jest.spyOn(service, 'getDoctorById').mockResolvedValue(expectedResult);

      const result = await controller.getDoctorById(id);

      expect(service['getDoctorById']).toHaveBeenCalledWith(id);
      expect(result).toEqual(expectedResult);
    });
  });
});
