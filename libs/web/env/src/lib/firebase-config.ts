import { z } from 'zod';

const VITE_PUBLIC_FIREBASE_CONFIG = z
  .object({
    apiKey: z.string(),
    authDomain: z.string(),
    projectId: z.string(),
    storageBucket: z.string(),
    messagingSenderId: z.string(),
    appId: z.string(),
    locationId: z.literal('europe-central2'),
  })
  .strict();

type FirebaseOptions = z.infer<typeof VITE_PUBLIC_FIREBASE_CONFIG>;
const firebaseConfigString = import.meta.env.VITE_PUBLIC_FIREBASE_CONFIG;
const config = JSON.parse(firebaseConfigString || {}) as FirebaseOptions;
const parsed = VITE_PUBLIC_FIREBASE_CONFIG.safeParse(config);

if (parsed.success === false) {
  const errors = JSON.stringify(parsed.error.flatten().fieldErrors, null, 2);
  throw new Error(`VITE_PUBLIC_FIREBASE_CONFIG is invalid\n${errors}`);
}

const firebaseConfig: FirebaseOptions = Object.assign({}, parsed.data);
Object.freeze(firebaseConfig);

export { firebaseConfig, VITE_PUBLIC_FIREBASE_CONFIG, type FirebaseOptions };
