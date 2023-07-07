import { env, type FirebaseOptions } from '@ntua-saas-10/web/env';
import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, connectAuthEmulator, type Auth } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator, type Firestore } from 'firebase/firestore';

class FirebaseWeb {
  config: FirebaseOptions;
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
  projectId: string;

  constructor(config: FirebaseOptions) {
    this.config = config || {};
    if (Object.keys(this.config).length === 0) {
      throw new Error('VITE_PUBLIC_FIREBASE_CONFIG env var is not set');
    }
    this.app = this.initializeFirebaseWebApp();
    this.auth = getAuth(this.app);
    this.firestore = getFirestore(this.app);
    this.projectId = this.config.projectId;

    const isDevMode = import.meta.env.DEV === true;
    if (isDevMode) {
      this.connectEmulators();
    }
  }

  initializeFirebaseWebApp(): FirebaseApp {
    try {
      return initializeApp(this.config);
    } catch (error) {
      throw new Error('Firebase web initializeApp error - @ntua-saas-10/web/firebase');
    }
  }

  connectEmulators(): void {
    const LOCALHOST = 'localhost';
    connectAuthEmulator(this.auth, `http://${LOCALHOST}:${env.VITE_PUBLIC_AUTH_EMULATOR_PORT}`);
    connectFirestoreEmulator(
      this.firestore,
      LOCALHOST,
      Number(env.VITE_PUBLIC_FIRESTORE_EMULATOR_PORT),
    );
  }
}

const firebase = new FirebaseWeb(env.VITE_PUBLIC_FIREBASE_CONFIG);

export const auth: Auth = firebase.auth;
export const firestore: Firestore = firebase.firestore;
export const projectId: string = firebase.projectId;
