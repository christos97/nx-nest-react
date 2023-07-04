import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

//import { ClusterModule as Cluster } from '@ntua-saas-10/server/nest/cluster';

import express from 'express';

import { AppModule } from './app/app.module';

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 1111;
  const service = process.env.SERVICE_NAME?.toLowerCase() || 'api';
  const logger = new Logger(service);
  const limit = '15mb';
  app.use(express.json({ limit }));
  app.use(express.urlencoded({ limit, extended: true }));
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(port);
  logger.log(`🚀 Service: ${service} is running on: http://localhost:${port}`);
};

//Cluster.fork(bootstrap);
bootstrap();
