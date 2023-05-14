import { admin, type Storage } from '@ntua-saas-10/firebase-admin';

class StorageWorkspace {
  private static instance: StorageWorkspace;
  private readonly _storage!: Storage;
  constructor() {
    if (!StorageWorkspace.instance) {
      StorageWorkspace.instance = this;
      this._storage = admin.storage;
    }
  }

  get storage() {
    return this._storage;
  }
}

const storageWorkspace = new StorageWorkspace();
export default storageWorkspace.storage;
