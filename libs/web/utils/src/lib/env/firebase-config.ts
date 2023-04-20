import { z } from '../zod';

const GCP_ALLOWED_REGIONS = ['europe-central2', 'us-central2'] as const;

const VITE_PUBLIC_FIREBASE_CONFIG = z.object({
  apiKey: z.string(),
  authDomain: z.string(),
  projectId: z.string(),
  storageBucket: z.string(),
  messagingSenderId: z.string(),
  appId: z.string(),
  locationId: z.enum(GCP_ALLOWED_REGIONS),
});

type FirebaseConfig = z.infer<typeof VITE_PUBLIC_FIREBASE_CONFIG>;

const firebaseConfigString = import.meta.env.VITE_PUBLIC_FIREBASE_CONFIG;
const config = JSON.parse(firebaseConfigString) as FirebaseConfig;
const parsed = VITE_PUBLIC_FIREBASE_CONFIG.safeParse(config);

if (parsed.success === false) {
  console.error(
    '❌ VITE_PUBLIC_FIREBASE_CONFIG is invalid',
    parsed.error.flatten().fieldErrors
  );
  throw new Error('VITE_PUBLIC_FIREBASE_CONFIG is invalid');
}

const firebaseConfig = Object.assign({}, parsed.data);
Object.freeze(firebaseConfig);

export { firebaseConfig, VITE_PUBLIC_FIREBASE_CONFIG };
