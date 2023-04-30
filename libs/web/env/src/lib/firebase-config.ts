import { z } from './_zod';

const VITE_PUBLIC_FIREBASE_CONFIG = z
  .object({
    apiKey: z.string(),
    authDomain: z.string(),
    projectId: z.string(),
    storageBucket: z.string(),
    messagingSenderId: z.string(),
    appId: z.string(),
    locationId: z.enum(['europe-central2', 'us-central2']),
  })
  .strict();

type FirebaseOptions = z.infer<typeof VITE_PUBLIC_FIREBASE_CONFIG>;
const firebaseConfigString = import.meta.env.VITE_PUBLIC_FIREBASE_CONFIG;
const config = JSON.parse(firebaseConfigString) as FirebaseOptions;
const parsed = VITE_PUBLIC_FIREBASE_CONFIG.safeParse(config);

if (parsed.success === false) {
  console.error(
    '❌ VITE_PUBLIC_FIREBASE_CONFIG is invalid',
    parsed.error.flatten().fieldErrors
  );
  throw new Error('VITE_PUBLIC_FIREBASE_CONFIG is invalid');
}

const firebaseConfig = Object.assign({}, parsed.data);

export { firebaseConfig, VITE_PUBLIC_FIREBASE_CONFIG, type FirebaseOptions };
