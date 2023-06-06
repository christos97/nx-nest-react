import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 4242;

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
