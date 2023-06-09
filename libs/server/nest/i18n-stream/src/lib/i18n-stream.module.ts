import { InjectionToken } from '@nestjs/common';
import { DynamicModule, Module } from '@nestjs/common';
import { I18nStreamController } from './i18n-stream.controller';
import { I18nStreamService } from './i18n-stream.service';
import { ServeStaticModule } from '@nestjs/serve-static';
// needed because of reasons
import '@nestjs/platform-express';

interface I18nStreamModuleOptions {
  /**
   * The path to the i18n directory
   */
  rootPath: string;
}

export const ROOT_PATH: InjectionToken = 'ROOT_PATH';

@Module({
  controllers: [I18nStreamController],
  providers: [I18nStreamService],
})
export class I18nStreamModule {
  static forRoot({ rootPath }: I18nStreamModuleOptions): DynamicModule {
    return {
      module: I18nStreamModule,
      imports: [
        ServeStaticModule.forRoot({
          rootPath,
          serveStaticOptions: {
            dotfiles: 'deny',
            cacheControl: true,
            maxAge: '1d',
            immutable: true,
            index: false,
          },
        }),
      ],
      providers: [
        {
          provide: ROOT_PATH,
          useValue: rootPath,
        },
        I18nStreamService,
      ],
      exports: [I18nStreamService, ROOT_PATH],
    };
  }
}
