import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('');
  app.use(express.json({ limit: '50mb' }));
  const config = new DocumentBuilder()
    .setTitle('Phone number validator microservice')
    .setDescription('Validate phone numbers')
    .setVersion('1.0')
    .addTag('validate')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(9000);
}

bootstrap();
