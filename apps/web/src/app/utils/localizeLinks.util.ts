import type { TFunction } from 'i18next';
import { AppRoutes } from '../routes';
import { Consts, HeaderLink } from '@ntua-saas-10/api-interfaces';

const {
  common: { home, login, logout, dashboard },
} = Consts.TranslationKeys;
const { Home, Auth, Dashboard } = AppRoutes;

const createLink = (label: string, path: string) => ({ label, path });

export const localizeLinks = (t: TFunction, isLoggedIn: boolean): HeaderLink[] => {
  const loggedIn = (t: TFunction) => [
    createLink(t(home), Home.path),
    createLink(t(dashboard), Dashboard.path),
    createLink(t(logout), Home.path),
  ];
  const anonymous = (t: TFunction) => [
    createLink(t(home), Home.path),
    createLink(t(login), Auth.path),
  ];
  return isLoggedIn ? loggedIn(t) : anonymous(t);
};
