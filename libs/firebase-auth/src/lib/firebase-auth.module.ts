import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { FirebaseAuthMiddleware } from './firebase-auth.middleware';

@Module({
  controllers: [],
  providers: [FirebaseAuthMiddleware],
  exports: [],
})
export class FirebaseAuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FirebaseAuthMiddleware).forRoutes({
      path: '/api/*',
      method: RequestMethod.ALL,
    });
  }
}
