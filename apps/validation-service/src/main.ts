import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { json, urlencoded } from 'express';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Validation Service')
    .setDescription('Service for validating datafiles')
    .setVersion('1.0')
    .addTag('validation')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 4242;
  const limit = '5mb';
  app.use(json({ limit }));
  app.use(urlencoded({ limit, extended: true }));
  app.enableCors();
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`, process.env.SERVICE_NAME);
}

bootstrap();
