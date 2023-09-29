import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhoneNumberController } from './phone-number.controller';
import { PhoneNumberService } from './phone-number.service';
import { PhoneNumberSchema } from './schema/phone-number.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'PhoneNumber', schema: PhoneNumberSchema },
    ]),
  ],
  controllers: [PhoneNumberController],
  providers: [PhoneNumberService],
})
export class PhoneNumberModule {}
