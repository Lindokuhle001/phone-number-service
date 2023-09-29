import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CountriesModule } from './countries/countries.module';
import { Module } from '@nestjs/common';
import * as path from 'path';
import { PhoneNumberModule } from './phone-number/phone-number.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.resolve(__dirname, '../../../.env'),
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.DB_URI,
      }),
    }),
    PhoneNumberModule,
    CountriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
