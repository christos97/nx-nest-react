import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import express from 'express';

import { AppModule } from './app/app.module';

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.PORT);
  const service = 'api';
  const logger = new Logger(service);
  const limit = '15mb';

  app.setGlobalPrefix(service);
  app.use(express.json({ limit }));
  app.use(express.urlencoded({ limit, extended: true }));
  app.enableCors();

  await app.listen(port);
  logger.log(`${service} is running on: ${port}`);
};

bootstrap();
