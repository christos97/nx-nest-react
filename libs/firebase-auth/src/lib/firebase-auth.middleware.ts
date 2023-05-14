import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';

import { auth } from '@ntua-saas-10/firebase-admin';

import type { NextFunction } from 'express';
import type { DecodedIdToken } from 'firebase-admin/auth';
import type { AuthRequest, AuthResponse, JwtCustomClaims } from '@ntua-saas-10/api-interfaces';

@Injectable()
export class FirebaseAuthMiddleware implements NestMiddleware {
  async use(req: AuthRequest, res: AuthResponse, next: NextFunction) {
    const jwt = req.headers.authorization;
    if (!jwt?.startsWith('Bearer ')) {
      return res.status(HttpStatus.BAD_REQUEST).send({ message: 'BAD REQUEST' });
    }
    const idToken = jwt.split('Bearer ')[1];
    try {
      const user = await auth.verifyIdToken(idToken);
      const { customClaims } = await auth.getUser(user.uid);
      req['user'] = user as DecodedIdToken;
      user.uid;
      req['claims'] = customClaims as JwtCustomClaims;
      // if (customClaims?.role !== 'admin') return res.status(403).send({ message: 'FORBIDDEN' });
      return next();
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).send({ message: 'UNAUTHORIZED' });
    }
  }
}
