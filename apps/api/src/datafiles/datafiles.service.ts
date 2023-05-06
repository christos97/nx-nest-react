import { Injectable } from '@nestjs/common';
import { admin } from '@ntua-saas-10/firebase-admin';

@Injectable()
export class DatafilesService {
  private storage = admin.storage;

  async uploadToStorage(
    file: Express.Multer.File,
    path: string,
    filename: string,
    metadata: any
  ) {
    await this.storage.bucket().file(`${path}/${filename}`).save(file.buffer, {
      metadata,
      contentType: file.mimetype,
      public: true,
    });
  }
}
