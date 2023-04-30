const AppRoutes = {
  Home: '/',
  Auth: '/auth',
  Dashboard: '/dashboard',
} as const;

Object.freeze(AppRoutes);
export type AppRoutes = typeof AppRoutes;
export { AppRoutes };
