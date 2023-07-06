import { Auth } from './auth';
import { Dashboard } from './dashboard';
import { Home } from './home';
import { User } from './user';

export const Pages = {
  Home,
  Auth,
  Dashboard,
  User,
} as const;

export type Pages = keyof typeof Pages;
