import { admin } from '@ntua-saas-10/server-firebase-admin';
import 'firebase-functions';

admin.init({ projectId: process.env.GCLOUD_PROJECT });

export { authUserCreatedTrigger, objectFinalizedTrigger } from '@ntua-saas-10/functions-triggers';
