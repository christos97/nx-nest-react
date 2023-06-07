import type { Response } from 'express';

export interface AuthResponse extends Response {
  message: 'UNAUTHORIZED' | 'FORBIDDEN' | 'BAD REQUEST';
}
