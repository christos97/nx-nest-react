import { Injectable } from '@nestjs/common';
import { admin } from '@ntua-saas-10/firebase-admin';

@Injectable()
export class DatafilesService {
  private storage = admin.storage;

  async uploadToStorage(file: Express.Multer.File, path: string, filename: string, metadata: { [key: string]: any }) {
    const fileRef = this.storage.bucket().file(`${path}/${filename}`);

    await fileRef.save(file.buffer, {
      metadata: { metadata },
      contentType: file.mimetype,
      public: true,
    });

    const [meta] = await fileRef.getMetadata();
    return meta;
  }
}
