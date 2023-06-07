import { type MiddlewareConsumer, type NestModule, Module } from '@nestjs/common';
import { DatafilesModule } from '@ntua-saas-10/server/nest/resources/datafiles';
import { DatafilesController } from '@ntua-saas-10/server/nest/resources/datafiles';
import { FirebaseAuthMiddleware } from '@ntua-saas-10/server/nest/firebase-auth-middleware';

@Module({
  imports: [DatafilesModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FirebaseAuthMiddleware).forRoutes(DatafilesController);
  }
}
