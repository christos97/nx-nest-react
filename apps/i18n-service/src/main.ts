import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import compression from 'compression';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const service = process.env.SERVICE_NAME?.toLowerCase() || 'DEFINE_SERVICE_NAME';
  const logger = new Logger(service);

  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 1188;
  app.enableCors();
  app.use(compression());
  const config = new DocumentBuilder().setTitle(service).setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(port);
  logger.log(`🚀 Service: ${service} is running on: http://localhost:${port}`);
}

bootstrap();
