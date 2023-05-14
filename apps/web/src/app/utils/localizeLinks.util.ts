import type { TFunction } from 'i18next';
import { TransHolders } from '../constants/translations.constants';
import { AppRoutes } from '../routes';

const {
  common: { home, login, logout, dashboard },
} = TransHolders;
const { Home, Auth, Dashboard } = AppRoutes;

export const localizeLinks = (t: TFunction, isLoggedIn: boolean) => {
  const loggedIn = (t: TFunction) => [
    { label: t(home), path: Home.path },
    { label: t(logout), path: Home.path },
    { label: t(dashboard), path: Dashboard.path },
  ];

  const anonymous = (t: TFunction) => [
    { label: t(home), path: Home.path },
    { label: t(login), path: Auth.path },
  ];
  return isLoggedIn ? loggedIn(t) : anonymous(t);
};
