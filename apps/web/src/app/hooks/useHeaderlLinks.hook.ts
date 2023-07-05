/**
 * Dont edit this file directly
 * @fileoverview Header links hook for the app header. Uses i18n for localization.
 * @global apps/web/~/hooks/useHeaderlLinks.hook.ts
 */
import { auth } from '@ntua-saas-10/web/firebase';

import { useMemo } from 'react';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';

import { TRANSLATE_PREFIX } from '../constants/i18n.constants';
import type { HeaderLink } from '../types/HeaderLink.type';
import { localizeLinks } from '../utils/localizeLinks.util';

export const useHeaderlLinks = (): HeaderLink[] => {
  const [user] = useAuthState(auth);
  const [signOut] = useSignOut(auth);
  const { t } = useTranslation('translation', TRANSLATE_PREFIX.COMMON);
  return useMemo(() => localizeLinks(t, !!user, signOut), [t, user, signOut]);
};
