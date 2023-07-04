import type { Schemas } from '@ntua-saas-10/shared-schemas';
import type { Request } from 'express';
import type { DecodedIdToken } from 'firebase-admin/auth';

export interface AuthRequest extends Request {
  user: DecodedIdToken;
  customClaims: Partial<Schemas.UserCustomClaims>;
}
