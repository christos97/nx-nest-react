import { z } from './_zod';
import {
  VITE_PUBLIC_FIREBASE_CONFIG,
  firebaseConfig,
  type FirebaseOptions,
} from './firebase-config';

const client = z.object({
  VITE_PUBLIC_FIREBASE_CONFIG,
  VITE_PUBLIC_API_KEY: z.string().optional(),
  VITE_PUBLIC_I18N_SERVICE_URL: z.string().url().optional(),
});

type ProcessEnv = z.infer<typeof client>;

const processEnv = {
  VITE_PUBLIC_FIREBASE_CONFIG: firebaseConfig as FirebaseOptions,
  VITE_PUBLIC_API_KEY: import.meta.env.VITE_PUBLIC_API_KEY,
  VITE_PUBLIC_I18N_SERVICE_URL: import.meta.env.VITE_PUBLIC_I18N_SERVICE_URL,
} as ProcessEnv;

const parsed = client.safeParse(processEnv);

if (parsed.success === false) {
  console.error(
    '❌ Invalid environment variables:',
    parsed.error.flatten().fieldErrors
  );
  throw new Error('Invalid environment variables');
}

const env = Object.assign({}, parsed.data);
Object.freeze(env);

export { env, type ProcessEnv, type FirebaseOptions };
export default env;