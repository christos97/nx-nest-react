import { initializeApp } from 'firebase/app';
import { getAuth, type Auth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, type Firestore, connectFirestoreEmulator } from 'firebase/firestore';

import { env, type FirebaseOptions } from '@ntua-saas-10/web/env';

const config: FirebaseOptions = env.VITE_PUBLIC_FIREBASE_CONFIG || {};

if (Object.keys(config).length === 0) {
  throw new Error('VITE_PUBLIC_FIREBASE_CONFIG env var is not set');
}

const app = initializeApp(config);

/** `WEB-ONLY` - Firebase `auth` module */
export const auth: Auth = getAuth(app);

/** `WEB-ONLY` - Firebase `firestore` module */
export const firestore: Firestore = getFirestore(app);

/** `WEB-ONLY` - Firebase `projectId` */
export const projectId: string = config.projectId;

const connectEmulators = () => {
  const LOCALHOST = 'localhost';
  connectAuthEmulator(auth, `http://${LOCALHOST}:${env.VITE_PUBLIC_AUTH_EMULATOR_PORT}`);
  connectFirestoreEmulator(firestore, LOCALHOST, Number(env.VITE_PUBLIC_FIRESTORE_EMULATOR_PORT));
};

// Connect to Firebase Emulators in dev mode
const isDevMode = import.meta.env.DEV === true;
if (isDevMode) {
  connectEmulators();
}
