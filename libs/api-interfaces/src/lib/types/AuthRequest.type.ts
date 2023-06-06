import type { Request } from 'express';
import type { DecodedIdToken } from 'firebase-admin/auth';
import type { JwtCustomClaims } from './JwtCustomClaims.type';

export interface AuthRequest extends Request {
  user: DecodedIdToken;
  claims: JwtCustomClaims;
}
