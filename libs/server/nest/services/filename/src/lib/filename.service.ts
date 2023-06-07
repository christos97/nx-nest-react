import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { parse, extname } from 'path';
import type { Types } from '@ntua-saas-10/shared-types';
@Injectable()
export class FilenameService {
  generateFileInfo(filename: string, chartType: Types.ChartType) {
    const originalFilename = parse(filename).name;
    const fileExtension = extname(filename).replace('.', '');
    const fileId = randomUUID();
    const newFilename = `${originalFilename}__${fileId}__${chartType}.${fileExtension}`;
    return { fileId, newFilename };
  }
}
