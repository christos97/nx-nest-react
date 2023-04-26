import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { admin } from '@ntua-saas-10/firebase-admin';
@Injectable()
export class FirebaseAuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const idToken = authHeader.split(' ')[1];
      try {
        const decodedToken = await admin.auth.verifyIdToken(idToken);
        req['user'] = {
          email: decodedToken.email,
          roles: decodedToken.roles || [],
          type: decodedToken.type,
        };
        next();
      } catch (error) {
        res.status(401).send({
          error: 'Unauthorized',
        });
      }
    } else {
      res.status(404).send({
        error: 'Bad Request',
      });
    }
  }
}
