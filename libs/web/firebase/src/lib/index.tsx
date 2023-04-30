import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from 'firebase/storage';

import { env, type FirebaseOptions } from '@ntua-saas-10/web/env';

const config = env.VITE_PUBLIC_FIREBASE_CONFIG as FirebaseOptions;
const app = initializeApp(config);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const projectId = env.VITE_PUBLIC_FIREBASE_CONFIG.projectId;

// Connect to the Firebase Emulator if running locally - DEV ONLY
const shouldSetupEmulators = import.meta.env.DEV === true && import.meta.env.PROD === false;
if (shouldSetupEmulators) {
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(firestore, 'localhost', 8080);
  connectStorageEmulator(storage, 'localhost', 9199);
}
