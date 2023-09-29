import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PhoneNumberModule } from '../src/phone-number/phone-number.module';

describe('PhoneNumberController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PhoneNumberModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/validate-phone-number (POST) - should validate phone numbers', async () => {
    const phoneNumbers = [
      { phoneNumber: '+1234567890' },
      { phoneNumber: '+9876543210' },
    ];

    const response = await request(app.getHttpServer())
      .post('/api/validate-phone-number')
      .send({ phoneNumbers })
      .expect(HttpStatus.CREATED);

    const results = response.body;

    expect(results).toHaveLength(2);
    expect(results[0]).toHaveProperty('phoneNumber', '+1234567890');
    expect(results[1]).toHaveProperty('phoneNumber', '+9876543210');
  });

  it('/api/validate-phone-number (POST) - should handle invalid phone numbers', async () => {
    const phoneNumbers = [
      { phoneNumber: 'invalid1' },
      { phoneNumber: 'invalid2' },
    ];

    const response = await request(app.getHttpServer())
      .post('/api/validate-phone-number')
      .send({ phoneNumbers })
      .expect(HttpStatus.BAD_REQUEST);

    const errorMessage = response.body.message;

    expect(errorMessage).toBe('Invalid phone number');
  });

  afterAll(async () => {
    await app.close();
  });
});
