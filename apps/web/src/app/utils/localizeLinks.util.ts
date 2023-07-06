import { TranslationKeys } from '@ntua-saas-10/shared-consts';
import type { TFunction } from 'i18next';

import { AppRoutes } from '../routes';
import type { HeaderLink } from '../types/HeaderLink.type';

const {
  common: { home, login, logout, dashboard, user },
} = TranslationKeys;

const { Home, Auth, Dashboard, User } = AppRoutes;

const createLink = (label: string, path: string, isButton = false, handler?: () => any) => ({
  label,
  path,
  isButton,
  handler,
});

export const localizeLinks = (
  t: TFunction,
  isLoggedIn: boolean,
  handler?: () => any,
): HeaderLink[] => {
  const loggedIn = (t: TFunction) => [
    createLink(t(home), Home.path),
    createLink(t(dashboard), Dashboard.path),
    createLink(t(user), User.path),
    createLink(t(logout), Home.path, true, handler),
  ];
  const anonymous = (t: TFunction) => [
    createLink(t(home), Home.path),
    createLink(t(login), Auth.path),
  ];
  return isLoggedIn ? loggedIn(t) : anonymous(t);
};
