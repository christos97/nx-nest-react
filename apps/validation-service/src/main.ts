import { patchNestjsSwagger } from '@anatine/zod-nestjs';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { json, urlencoded } from 'express';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const service = 'VALIDATION_SERVICE';
  const port = Number(process.env.PORT);
  const limit = '5mb';
  const logger = new Logger(service);

  const options = new DocumentBuilder()
    .setTitle(service)
    .setDescription('Service for validating datafiles')
    .setVersion('1.0')
    .addTag('validation')
    .build();

  patchNestjsSwagger(); // <--- Add this line
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);

  app.use(json({ limit }));
  app.use(urlencoded({ limit, extended: true }));
  app.enableCors();

  await app.listen(port);
  logger.log(`${service} is running on: ${port}`);
}

bootstrap();
