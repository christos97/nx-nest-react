import { z } from './_zod';
import {
  VITE_PUBLIC_FIREBASE_CONFIG,
  firebaseConfig,
  type FirebaseOptions,
} from './firebase-config';

const client = z.object({
  VITE_PUBLIC_FIREBASE_CONFIG,
  VITE_PUBLIC_API: z.string().optional(),
  VITE_PUBLIC_I18N_SERVICE_URL: z.string().url(),
  VITE_PUBLIC_AUTH_EMULATOR_PORT: z.string(),
  VITE_PUBLIC_FIRESTORE_EMULATOR_PORT: z.string(),
  VITE_PUBLIC_FIREBASE_AUTH_PERSISTENCE: z.string(),
});

type ProcessEnv = z.infer<typeof client>;

const processEnv: ProcessEnv = {
  VITE_PUBLIC_FIREBASE_CONFIG: firebaseConfig as FirebaseOptions,
  VITE_PUBLIC_API: import.meta.env.VITE_PUBLIC_API,
  VITE_PUBLIC_I18N_SERVICE_URL: import.meta.env.VITE_PUBLIC_I18N_SERVICE_URL,
  VITE_PUBLIC_AUTH_EMULATOR_PORT: import.meta.env.VITE_PUBLIC_AUTH_EMULATOR_PORT,
  VITE_PUBLIC_FIRESTORE_EMULATOR_PORT: import.meta.env.VITE_PUBLIC_FIRESTORE_EMULATOR_PORT,
  VITE_PUBLIC_FIREBASE_AUTH_PERSISTENCE: import.meta.env.VITE_PUBLIC_FIREBASE_AUTH_PERSISTENCE,
};

const parsed = client.safeParse(processEnv);

if (parsed.success === false) {
  console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
  throw new Error('Invalid environment variables');
}

const env = Object.assign({}, parsed.data) as ProcessEnv;
Object.freeze(env);

export { env, type ProcessEnv, type FirebaseOptions };
export default env;
