import { Auth } from './auth';
import { Dashboard } from './dashboard';
import { Home } from './home';

export const Pages = {
  Home,
  Auth,
  Dashboard,
} as const;

export type Pages = keyof typeof Pages;
