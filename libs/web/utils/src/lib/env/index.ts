import { z } from 'zod';
import { VITE_PUBLIC_FIREBASE_CONFIG, firebaseConfig } from './firebase-config';

const client = z.object({
  VITE_PUBLIC_FIREBASE_CONFIG,
  VITE_PUBLIC_API_KEY: z.string().optional(),
});

type ProcessEnv = z.infer<typeof client>;

const processEnv = {
  VITE_PUBLIC_FIREBASE_CONFIG: firebaseConfig,
  VITE_PUBLIC_API_KEY: import.meta.env.VITE_PUBLIC_API_KEY,
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

export default env;
