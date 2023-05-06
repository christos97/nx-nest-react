import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ChartType } from '@ntua-saas-10/api-interfaces';
import { parse, extname } from 'path';

@Injectable()
export class FilenameService {
  generateFileInfo(filename: string, chartType: ChartType) {
    const originalFilename = parse(filename).name;
    const fileExtension = extname(filename).replace('.', '');
    const fileId = randomUUID();
    const newFilename = `${originalFilename}__${fileId}__${chartType}.${fileExtension}`;
    return { fileId, newFilename };
  }

  generateFilenameSuffix() {
    return `__${randomUUID()}__test`;
  }
}
