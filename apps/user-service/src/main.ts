/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { patchNestjsSwagger } from '@anatine/zod-nestjs';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const globalPrefix = 'api';
  // app.setGlobalPrefix(globalPrefix);
  const config = new DocumentBuilder()
    .setTitle('Users Service')
    .setDescription('')
    .setVersion('1.0')
    .addTag('users')
    .build();
  patchNestjsSwagger(); // <--- Add this line
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  const port = process.env.PORT || 4862;
  app.enableCors();
  await app.listen(port);
  const logger = new Logger(process.env.SERVICE_NAME?.toLowerCase() || 'users-service');
  logger.log(`http://localhost:${port}`);
}

bootstrap();
