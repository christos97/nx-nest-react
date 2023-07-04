import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

// import { ClusterModule as Cluster } from '@ntua-saas-10/server/nest/cluster';

import express from 'express';

import { AppModule } from './app/app.module';

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3333;
  const service = process.env.SERVICE_NAME?.toLowerCase() || 'render-service';
  const logger = new Logger(service);
  const limit = '2mb';
  app.use(express.json({ limit }));
  app.use(express.urlencoded({ limit, extended: true }));
  app.enableCors();
  await app.listen(port);
  logger.log(`🚀 Service: ${service} is running on: http://localhost:${port}`);
};

//Cluster.fork(bootstrap);
bootstrap();
