import { type MiddlewareConsumer, type NestModule, Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { DatafilesModule, DatafilesController } from '@ntua-saas-10/server/nest/datafiles';
import { FirebaseAuthMiddleware } from '@ntua-saas-10/server/nest/firebase-auth-middleware';
import { TransactionController, TransactionModule } from '@ntua-saas-10/server/nest/transaction';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 1,
    }),
    DatafilesModule,
    TransactionModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FirebaseAuthMiddleware).forRoutes(DatafilesController, TransactionController);
  }
}
