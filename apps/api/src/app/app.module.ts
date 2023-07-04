import { type MiddlewareConsumer, type NestModule, Module } from '@nestjs/common';
import { DatafilesModule, DatafilesController } from '@ntua-saas-10/server/nest/datafiles';
import { FirebaseAuthMiddleware } from '@ntua-saas-10/server/nest/firebase-auth-middleware';
import { TransactionController, TransactionModule } from '@ntua-saas-10/server/nest/transaction';

@Module({
  imports: [DatafilesModule, TransactionModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FirebaseAuthMiddleware).forRoutes(DatafilesController, TransactionController);
  }
}
