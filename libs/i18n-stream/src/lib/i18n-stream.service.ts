import { Inject, Injectable } from '@nestjs/common';
import { type ReadStream, createReadStream } from 'fs';
import { join } from 'path';

@Injectable()
export class I18nStreamService {
  private readonly rootPath: string;

  constructor(@Inject('ROOT_PATH') rootPath: string) {
    this.rootPath = rootPath;
  }

  getStream(filename: string): ReadStream {
    return createReadStream(join(this.rootPath, filename));
  }
}
