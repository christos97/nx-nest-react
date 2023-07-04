import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import type { Schema } from 'mongoose';

interface IFeatureModel<T> {
  name: string;
  schema: Schema<T> | Record<keyof T, unknown>;
}

@Module({})
export class DatabaseModule {
  static forFeature<T>(...models: IFeatureModel<T>[]): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        MongooseModule.forFeature(models),
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
            uri: configService.get<string>('MONGODB_URI'),
          }),
          inject: [ConfigService],
        }),
      ],
      exports: [MongooseModule],
    };
  }
}
