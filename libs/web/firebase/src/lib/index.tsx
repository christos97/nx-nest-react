import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { env, type FirebaseOptions } from '@ntua-saas-10/web/env';

const app = initializeApp(env.VITE_PUBLIC_FIREBASE_CONFIG as FirebaseOptions);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const projectId = env.VITE_PUBLIC_FIREBASE_CONFIG.projectId;
