import { initializeApp } from 'firebase/app';
import { getAuth, type Auth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, type Firestore, connectFirestoreEmulator } from 'firebase/firestore';

import { env, type FirebaseOptions } from '@ntua-saas-10/web/env';

const config = env.VITE_PUBLIC_FIREBASE_CONFIG as FirebaseOptions;

if (!config) {
  throw new Error('VITE_PUBLIC_FIREBASE_CONFIG env var is not set');
}

const app = initializeApp(config);

export const auth: Auth = getAuth(app);
export const firestore: Firestore = getFirestore(app);
export const projectId: string = env.VITE_PUBLIC_FIREBASE_CONFIG.projectId;

const connectEmulators = () => {
  const LOCALHOST = 'localhost';
  connectAuthEmulator(auth, `http://${LOCALHOST}:${env.VITE_PUBLIC_AUTH_EMULATOR_PORT}`);
  connectFirestoreEmulator(firestore, LOCALHOST, Number(env.VITE_PUBLIC_FIRESTORE_EMULATOR_PORT));
};

// Connect to the Firebase Emulator if running locally - DEV ONLY
if (import.meta.env.DEV === true) {
  connectEmulators();
}
