import { default as Home } from './home';
import { default as Auth } from './auth';
import { default as Dashboard } from './dashboard';

export const Pages = {
  Home,
  Auth,
  Dashboard,
};

export type Pages = typeof Pages;
export default Pages;
