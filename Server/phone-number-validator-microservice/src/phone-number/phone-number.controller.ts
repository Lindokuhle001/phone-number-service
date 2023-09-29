import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { ValidatePhoneNumbersDto } from './dto/validate-phone-number.dto';
import { PhoneNumberService } from './phone-number.service';

@Controller('api')
export class PhoneNumberController {
  constructor(private readonly phoneNumberService: PhoneNumberService) {}

  @Post('validate-phone-number')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async validatePhoneNumbers(
    @Body() validatePhoneNumbersDto: ValidatePhoneNumbersDto,
  ) {
    try {
      const results = await Promise.all(
        validatePhoneNumbersDto.phoneNumbers.map(async (phoneNumberDto) => {
          const result = await this.phoneNumberService.validatePhoneNumber(
            phoneNumberDto.phoneNumber,
          );
          return {
            phoneNumber: phoneNumberDto.phoneNumber,
            ...result,
          };
        }),
      );

      return results;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
