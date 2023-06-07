import {
  Injectable,
  Logger,
  NestMiddleware,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { auth } from '@ntua-saas-10/server-firebase-admin';

// import { UserRole } from '@ntua-saas-10/shared-consts';

import type { Types } from '@ntua-saas-10/shared-types';
import type { NextFunction } from 'express';

const INVALID_TOKEN = 'Invalid token';

@Injectable()
export class FirebaseAuthMiddleware implements NestMiddleware {
  async use(req: Types.AuthRequest, res: Types.AuthResponse, next: NextFunction) {
    const jwt = req.headers.authorization;
    if (!jwt?.startsWith('Bearer ')) {
      Logger.log('No JWT provided', FirebaseAuthMiddleware.name);
      throw new BadRequestException(INVALID_TOKEN);
    }
    const idToken = jwt.split('Bearer ')[1] || '';
    try {
      const user = await auth.verifyIdToken(idToken);
      const { customClaims } = await auth.getUser(user.uid);
      req['user'] = user;
      const claims = customClaims as Types.UserCustomClaims;
      req['customClaims'] = claims || {};
      // if (!claims.roles.includes(UserRole.admin)) return res.status(HttpStatus.FORBIDDEN).send({ message: 'FORBIDDEN' });
      return next();
    } catch (error) {
      Logger.error(JSON.stringify(error), FirebaseAuthMiddleware.name);
      throw new UnauthorizedException(error);
    }
  }
}
