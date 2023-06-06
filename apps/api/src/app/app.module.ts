import { type MiddlewareConsumer, type NestModule, Module } from '@nestjs/common';
import { FirebaseAuthMiddleware } from '@ntua-saas-10/firebase-auth';
import { DatafilesModule } from '@ntua-saas-10/nest-resources/datafiles';
import { DatafilesController } from '@ntua-saas-10/nest-resources/datafiles';

@Module({
  imports: [DatafilesModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FirebaseAuthMiddleware).forRoutes(DatafilesController);
  }
}
