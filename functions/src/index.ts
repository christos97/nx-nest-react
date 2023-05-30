import { initializeApp, applicationDefault } from 'firebase-admin/app';
import 'firebase-functions';

initializeApp({
  projectId: 'lesi-charts',
  credential: applicationDefault(),
  storageBucket: `lesi-charts.appspot.com`,
});

export { objectFinalizedTrigger } from './objectFinalizedTrigger';
