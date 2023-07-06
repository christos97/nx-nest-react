import { Pages } from './pages';

const AppRoutes = {
  Home: {
    path: '/',
    page: 'home',
    isGuarded: false,
    isLazy: false,
    claims: [],
    FcComponent: Pages.Home,
  },
  Auth: {
    path: '/auth',
    page: 'auth',
    isGuarded: false,
    isLazy: true,
    claims: [],
    FcComponent: Pages.Auth,
  },
  Dashboard: {
    path: '/dashboard',
    page: 'dashboard',
    isGuarded: true,
    isLazy: true,
    claims: ['user'],
    FcComponent: Pages.Dashboard,
  },
  User: {
    path: '/user',
    page: 'user',
    isGuarded: true,
    isLazy: true,
    claims: ['user'],
    FcComponent: Pages.User,
  },
} as const;

Object.freeze(AppRoutes);
export type AppRoutes = typeof AppRoutes;
export { AppRoutes };
