import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { admin } from '@ntua-saas-10/server-firebase-admin';
import type { ContentType } from '@ntua-saas-10/shared-consts';
import type { Types } from '@ntua-saas-10/shared-types';
import { parse } from 'papaparse';

@Injectable()
export class DatafilesService {
  private storage = admin.storage;

  async uploadToStorage(
    file: Express.Multer.File,
    path: string,
    filename: string,
    metadata: Types.DatafileMetadata,
  ) {
    const fileRef = this.storage.bucket().file(`${path}/${metadata.uid}/${filename}`);

    await fileRef.save(file.buffer, {
      metadata: { metadata },
      contentType: file.mimetype,
      public: true,
    });

    const [meta] = await fileRef.getMetadata();
    return meta;
  }

  async streamFromStorage(name: string): Promise<Buffer> {
    const fileRef = this.storage.bucket().file(name);
    const stream = fileRef.createReadStream({ validation: false });

    const chunks: Uint8Array[] = [];
    return new Promise((resolve, reject) => {
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('error', (error: Error) => reject(new BadRequestException(error.message)));
      stream.on('end', () => resolve(Buffer.concat(chunks)));
    });
  }

  async deleteFile(filePath: string, uid: string) {
    try {
      const fileRef = this.storage.bucket().file(filePath);
      const [meta] = await fileRef.getMetadata();

      if (meta.metadata.uid !== uid) {
        throw new UnauthorizedException();
      }

      await fileRef.delete({ ignoreNotFound: true });
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      throw new BadRequestException('File could not be deleted');
    }
  }

  parseCsv(fileBuffer: Buffer) {
    const parsedFile = parse(fileBuffer.toString(), {
      fastMode: true,
      header: true,
    });

    if (parsedFile.errors.length > 0)
      throw new BadRequestException({ message: 'Invalid datafile', errors: parsedFile.errors });

    return parsedFile;
  }

  async uploadRender(
    buffer: Buffer,
    path: string,
    fileName: string,
    contentType: ContentType,
    metadata: Types.RenderMetadata,
  ) {
    const fileRef = this.storage
      .bucket()
      .file(`${path}/${metadata.uid}/${metadata.chartId}/${fileName}`);

    await fileRef.save(buffer, {
      contentType,
      public: true,
      metadata: { metadata },
    });

    const [meta] = await fileRef.getMetadata();
    return meta;
  }
}
