/**
 * Dont edit this file directly
 * @fileoverview Header links hook for the app header. Uses i18n for localization.
 * @global apps/web/~/hooks/useHeaderlLinks.hook.ts
 */
import { useMemo } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { TRANSLATE_PREFIX } from '../constants/i18n.constants';
import { auth } from '@ntua-saas-10/web/firebase';
import { localizeLinks } from '../utils/localizeLinks.util';
import type { HeaderLink } from '@ntua-saas-10/api-interfaces';

export const useHeaderlLinks = (): HeaderLink[] => {
  const [user] = useAuthState(auth);
  const { t } = useTranslation('translation', TRANSLATE_PREFIX.COMMON);
  return useMemo(() => localizeLinks(t, !!user), [t, user]);
};
