import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class PhoneNumber extends Document {
  @Prop()
  phoneNumber: string;

  @Prop()
  countryCode: string;

  @Prop()
  phoneNumberType: string;

  @Prop()
  isValid: boolean;

  @Prop()
  isLengthMatched: boolean;
}

export const PhoneNumberSchema = SchemaFactory.createForClass(PhoneNumber);
