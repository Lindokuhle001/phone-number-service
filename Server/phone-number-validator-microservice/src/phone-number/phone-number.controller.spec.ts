import { Test, TestingModule } from '@nestjs/testing';
import { PhoneNumberController } from './phone-number.controller';
import { PhoneNumberService } from './phone-number.service';
import { HttpStatus, HttpException } from '@nestjs/common';
import { ValidatePhoneNumbersDto } from './dto/validate-phone-number.dto';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PhoneNumber, PhoneNumberSchema } from './schema/phone-number.schema';
import { CountryCode, NumberType } from 'libphonenumber-js';

describe('PhoneNumberController', () => {
  let controller: PhoneNumberController;
  let phoneNumberService: PhoneNumberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhoneNumberController],
      providers: [PhoneNumberService],
      imports: [
        MongooseModule.forFeature([
          { name: 'PhoneNumber', schema: PhoneNumberSchema },
        ]),
      ],
    })
      .overrideProvider(getModelToken('PhoneNumber'))
      .useValue({} as Model<PhoneNumber>)
      .compile();

    controller = module.get<PhoneNumberController>(PhoneNumberController);
    phoneNumberService = module.get<PhoneNumberService>(PhoneNumberService);
  });

  describe('validatePhoneNumbers', () => {
    it('should validate phone numbers and return results', async () => {
      const dto: ValidatePhoneNumbersDto = {
        phoneNumbers: [
          { phoneNumber: '+1234567890' },
          { phoneNumber: '+441234567890' },
        ],
      };

      const validationResults = [
        {
          phoneNumber: '+1234567890',
          countryCode: 'US' as CountryCode,
          phoneNumberType: 'MOBILE' as NumberType,
          isValid: true,
          isValidLength: true,
        },
        {
          phoneNumber: '+441234567890',
          countryCode: 'GB' as CountryCode,
          phoneNumberType: 'LANDLINE' as NumberType,
          isValid: true,
          isValidLength: true,
        },
      ];

  
      jest
        .spyOn(phoneNumberService, 'validatePhoneNumber')
        .mockResolvedValueOnce(validationResults[0]);
      jest
        .spyOn(phoneNumberService, 'validatePhoneNumber')
        .mockResolvedValueOnce(validationResults[1]);

      const result = await controller.validatePhoneNumbers(dto);

      expect(result).toEqual(validationResults);
    });

    it('should throw a BAD_REQUEST HttpException when an error occurs', async () => {
      const dto: ValidatePhoneNumbersDto = {
        phoneNumbers: [{ phoneNumber: '+1234567890' }],
      };

      const errorMessage = 'Validation failed';

      jest
        .spyOn(phoneNumberService, 'validatePhoneNumber')
        .mockRejectedValueOnce(new Error(errorMessage));

      try {
        await controller.validatePhoneNumbers(dto);
        fail('Expected an HttpException to be thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.getStatus()).toBe(HttpStatus.BAD_REQUEST);
        expect(error.message).toBe(errorMessage);
      }
    });
  });
});
