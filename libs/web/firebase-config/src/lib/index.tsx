import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { env } from '@ntua-saas-10/web/utils';

const app = initializeApp(env.VITE_PUBLIC_FIREBASE_CONFIG);

export const auth = getAuth(app);
export const projectId = env.VITE_PUBLIC_FIREBASE_CONFIG.projectId;
