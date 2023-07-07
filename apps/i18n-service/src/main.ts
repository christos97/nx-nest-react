import { patchNestjsSwagger } from '@anatine/zod-nestjs';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import compression from 'compression';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  const port = Number(process.env.PORT);
  const service = 'I18N_SERVICE';
  const logger = new Logger(service);

  patchNestjsSwagger(); // <--- Add this line

  const options = new DocumentBuilder().setTitle(service).setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);

  app.setGlobalPrefix(globalPrefix);
  app.enableCors();
  app.use(compression());

  await app.listen(port);
  logger.log(`🚀 Service: ${service} is running on: http://localhost:${port}`);
}

bootstrap();
