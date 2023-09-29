import { IsNotEmpty, IsString } from 'class-validator';

export class ValidatePhoneNumberDto {
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;
}

export class ValidatePhoneNumbersDto {
  @IsNotEmpty()
  phoneNumbers: ValidatePhoneNumberDto[];
}
