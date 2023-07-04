import { type App, initializeApp, applicationDefault } from 'firebase-admin/app';
import { type Storage, getStorage } from 'firebase-admin/storage';
import { type Firestore, getFirestore } from 'firebase-admin/firestore';
import { type Auth, getAuth } from 'firebase-admin/auth';

const DEFINE_GCLOUD_PROJECT = 'DEFINE_GCLOUD_PROJECT';

interface FirebaseAdminConstructorConfig {
  projectId?: string;
}

class FirebaseAdmin {
  private static app: App;
  private static storage: Storage;
  private static firestore: Firestore;
  private static auth: Auth;
  private static projectId: string | undefined;

  constructor({ projectId }: FirebaseAdminConstructorConfig) {
    this.init({ projectId });
  }

  public init = ({ projectId }: FirebaseAdminConstructorConfig = {}): void => {
    if (!projectId || projectId === DEFINE_GCLOUD_PROJECT) {
      console.warn('initializeFirebaseAdmin was called without a projectId');
      return;
    }

    if (FirebaseAdmin.app) {
      console.warn('FirebaseAdmin ALREADY initialized for: ', FirebaseAdmin.projectId);
    } else {
      console.warn(
        '\n\n---------------------------\n',
        'FirebaseAdmin initializing for projectId: ',
        projectId,
        '\n---------------------------\n\n',
      );
      FirebaseAdmin.app = initializeApp({
        projectId,
        credential: applicationDefault(),
        storageBucket: `${projectId}.appspot.com`,
      });
      FirebaseAdmin.projectId = projectId;
      FirebaseAdmin.storage = getStorage(FirebaseAdmin.app);
      FirebaseAdmin.firestore = getFirestore(FirebaseAdmin.app);
      FirebaseAdmin.auth = getAuth(FirebaseAdmin.app);
    }
  };

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

  public get projectId(): string | undefined {
    return FirebaseAdmin.projectId;
  }
}

const admin = new FirebaseAdmin({
  projectId: process.env.GCLOUD_PROJECT || DEFINE_GCLOUD_PROJECT,
});

const storage = admin.storage;
const firestore = admin.firestore;
const auth = admin.auth;
const initializeFirebaseAdmin = admin.init;

export default { admin };
export { admin, storage, firestore, auth, initializeFirebaseAdmin };
export type { Storage, Firestore, Auth };
