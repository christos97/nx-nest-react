import {
  type App,
  initializeApp,
  applicationDefault,
} from 'firebase-admin/app';
import { type Storage, getStorage } from 'firebase-admin/storage';
import { type Firestore, getFirestore } from 'firebase-admin/firestore';
import { type Auth, getAuth } from 'firebase-admin/auth';

interface FirebaseAdminConstructorConfig {
  projectId: string;
}
class FirebaseAdmin {
  private static app: App;
  private static storage: Storage;
  private static firestore: Firestore;
  private static auth: Auth;
  private static projectId: string;

  constructor({ projectId }: FirebaseAdminConstructorConfig) {
    if (!FirebaseAdmin.app) {
      FirebaseAdmin.app = initializeApp({
        projectId,
        credential: applicationDefault(),
        storageBucket: `${projectId}.appspot.com`,
      });
      const app = FirebaseAdmin.app;
      FirebaseAdmin.storage = getStorage(app);
      FirebaseAdmin.firestore = getFirestore(app);
      FirebaseAdmin.auth = getAuth(app);
      FirebaseAdmin.projectId = projectId;
    }
  }

  public get app(): App {
    return FirebaseAdmin.app;
  }

  public get storage(): Storage {
    return FirebaseAdmin.storage;
  }

  public get firestore(): Firestore {
    return FirebaseAdmin.firestore;
  }

  public get auth(): Auth {
    return FirebaseAdmin.auth;
  }

  public get projectId(): string {
    return FirebaseAdmin.projectId;
  }
}

const admin = new FirebaseAdmin({
  projectId: process.env.GCLOUD_PROJECT,
});

export default admin;
