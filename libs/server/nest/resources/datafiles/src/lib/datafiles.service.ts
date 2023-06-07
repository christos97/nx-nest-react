import { BadRequestException, Injectable } from '@nestjs/common';
import { admin } from '@ntua-saas-10/server-firebase-admin';
import { parse } from 'papaparse';

@Injectable()
export class DatafilesService {
  private storage = admin.storage;

  async uploadToStorage(
    file: Express.Multer.File,
    path: string,
    filename: string,
    metadata: { [key: string]: unknown },
  ) {
    const fileRef = this.storage.bucket().file(`${path}/${filename}`);

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
      stream.on('error', reject);
      stream.on('end', () => resolve(Buffer.concat(chunks)));
    });
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
}
