/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { patchNestjsSwagger } from '@anatine/zod-nestjs';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { json } from 'express';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Users Service')
    .setDescription('')
    .setVersion('1.0')
    .addTag('users')
    .build();

  patchNestjsSwagger(); // <--- Add this line
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = Number(process.env.PORT);
  const service = 'user-service';
  const logger = new Logger(service);

  app.use(json());
  app.enableCors();

  await app.listen(port);
  logger.log(`${service} is running on: ${port}`);
}

bootstrap();
