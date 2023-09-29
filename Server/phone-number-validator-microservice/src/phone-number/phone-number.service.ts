import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PhoneNumber as PhoneNumberDocument } from './schema/phone-number.schema';
import {
  PhoneNumber,
  getCountryCallingCode,
  parsePhoneNumberFromString,
  validatePhoneNumberLength,
} from 'libphonenumber-js';
import { PhoneNumberType } from './shared/enums/phone-number-type.enum';
import { CountyCode } from './shared/enums/country-code.enum';

@Injectable()
export class PhoneNumberService {
  constructor(
    @InjectModel('PhoneNumber')
    private readonly phoneNumberModel: Model<PhoneNumberDocument>,
  ) {}

  async validatePhoneNumber(phoneNumber: string) {
    try {
      const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber);

      const countryCode = getCountryCallingCode(parsedPhoneNumber.country) || CountyCode.UNKNOWN;
      const phoneNumberType =
        parsedPhoneNumber?.getType() || PhoneNumberType.UNKNOWN;

      const isValidLength = !validatePhoneNumberLength(
        parsedPhoneNumber?.number,
      );

      const validatedPhoneNumber = {
        phoneNumber,
        countryCode,
        phoneNumberType: phoneNumberType,
        isValid: !!parsedPhoneNumber && parsedPhoneNumber.isValid(),
        isValidLength,
      };

      await this.phoneNumberModel.create(validatedPhoneNumber);

      return validatedPhoneNumber;
    } catch (error) {
      throw new Error('Invalid phone number');
    }
  }
}

