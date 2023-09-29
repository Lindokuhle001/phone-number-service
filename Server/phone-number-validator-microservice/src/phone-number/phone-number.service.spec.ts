import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { PhoneNumberService } from './phone-number.service';
import { PhoneNumber } from './schema/phone-number.schema';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { validatePhoneNumberLength } from 'libphonenumber-js';
import { getModelToken } from '@nestjs/mongoose';

describe('PhoneNumberService', () => {
  let phoneNumberService: PhoneNumberService;
  let phoneNumberModel: Model<PhoneNumber>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PhoneNumberService,
        {
          provide: getModelToken('PhoneNumber'),
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    


    phoneNumberService = module.get<PhoneNumberService>(PhoneNumberService);
    phoneNumberModel = module.get<Model<PhoneNumber>>(getModelToken('PhoneNumber'));
  });

  it('should be defined', () => {
    expect(phoneNumberService).toBeDefined();
  });

  describe('validatePhoneNumber', () => {
    it('should validate a valid phone number', async () => {
      const phoneNumber = '+27782225397';
      const mockParsedPhoneNumber = {
        country: 'ZA',
        getType: () => 'MOBILE',
        isValid: () => true,
        number: '+27782225397',
      } as any;

      jest.spyOn(parsePhoneNumberFromString as jest.Mock, 'call').mockImplementationOnce(() => mockParsedPhoneNumber);
      jest.spyOn(validatePhoneNumberLength as jest.Mock, 'call').mockReturnValueOnce(false);

      //@ts-ignore
      jest.spyOn(phoneNumberModel, 'create').mockResolvedValueOnce({
        phoneNumber: '+27782225397',
        countryCode: 'ZA',
        phoneNumberType: 'UNKNOWN',
        isValid: true,
        isValidLength: false,
      } as PhoneNumber);

      const result = await phoneNumberService.validatePhoneNumber(phoneNumber);

      expect(result.phoneNumber).toBe(phoneNumber);
      expect(result.countryCode).toBe('ZA');
      expect(result.phoneNumberType).toBe('UNKNOWN');
      expect(result.isValid).toBe(true);
      expect(result.isValidLength).toBe(true);
      expect(phoneNumberModel.create).toHaveBeenCalled();
    });

    it('should throw an error for an invalid phone number', async () => {
      const phoneNumber = 'invalid-number';
      jest.spyOn(parsePhoneNumberFromString as jest.Mock, 'call').mockImplementationOnce(() => null);

      await expect(phoneNumberService.validatePhoneNumber(phoneNumber)).rejects.toThrowError('Invalid phone number');
    });
  });
});
