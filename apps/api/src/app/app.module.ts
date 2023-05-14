import { type MiddlewareConsumer, type NestModule, Module } from '@nestjs/common';
import { FirebaseAuthMiddleware } from '@ntua-saas-10/firebase-auth';
import { DatafilesModule } from '../datafiles/datafiles.module';
import { DatafilesController } from '../datafiles/datafiles.controller';

@Module({
  imports: [DatafilesModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FirebaseAuthMiddleware).forRoutes(DatafilesController);
  }
}
