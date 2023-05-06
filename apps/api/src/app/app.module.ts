import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseAuthMiddleware } from '@ntua-saas-10/firebase-auth';
import { DatafilesModule } from '../datafiles/datafiles.module';

@Module({
  imports: [DatafilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FirebaseAuthMiddleware).forRoutes(AppController);
  }
}
