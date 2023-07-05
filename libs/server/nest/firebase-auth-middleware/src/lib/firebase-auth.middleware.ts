import {
  Injectable,
  Logger,
  NestMiddleware,
  UnauthorizedException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { auth } from '@ntua-saas-10/server-firebase-admin';
import { UserRole } from '@ntua-saas-10/shared-consts';

import type { AuthRequest, AuthResponse, UserCustomClaims } from '@ntua-saas-10/shared-types';
import type { NextFunction } from 'express';

const ERROR_MSG = {
  INVALID_TOKEN: 'Invalid token',
  USER_DISABLED: 'User is disabled',
  INSUFFICIENT_PERMISSIONS: 'User Authorization failed - Insufficient permissions',
  UNAUTHENTICATED: 'User Authentication failed',
} as const;

@Injectable()
export class FirebaseAuthMiddleware implements NestMiddleware {
  private readonly logger = new Logger(FirebaseAuthMiddleware.name);

  async use(req: AuthRequest, _: AuthResponse, next: NextFunction) {
    const jwt = req.headers.authorization;
    if (!jwt?.startsWith('Bearer ')) {
      this.logger.error(ERROR_MSG.INVALID_TOKEN);
      throw new BadRequestException(ERROR_MSG.INVALID_TOKEN);
    }

    const idToken = jwt.split('Bearer ')[1] || '';
    try {
      const user = await auth.verifyIdToken(idToken);
      req['user'] = user;

      // const customClaims = (await auth.getUser(user.uid)).customClaims as UserCustomClaims;
      // req['customClaims'] = Object.keys(customClaims || {}).length > 0 ? customClaims : {};
      //
      // if (customClaims.disabled === true) {
      //   this.logger.error(ERROR_MSG.USER_DISABLED);
      //   throw new ForbiddenException(ERROR_MSG.USER_DISABLED);
      // }
      //
      // if (!customClaims.roles?.includes(UserRole.user)) {
      //   this.logger.error(ERROR_MSG.INSUFFICIENT_PERMISSIONS);
      //   throw new ForbiddenException(ERROR_MSG.INSUFFICIENT_PERMISSIONS);
      // }
      return next();
    } catch (error) {
      const e = error as Error;
      this.logger.error(error);
      throw new UnauthorizedException(ERROR_MSG.UNAUTHENTICATED, {
        cause: e,
        description: e?.message || ERROR_MSG.UNAUTHENTICATED,
      });
    }
  }
}
