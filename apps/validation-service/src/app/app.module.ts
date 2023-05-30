import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements OnModuleInit {
  onModuleInit(): any {
    console.log('init');
  }
}
