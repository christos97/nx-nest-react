import { useMemo } from 'react';
import { AppRoutes } from '../routes';
import { TransHolders } from '../constants/translations.constants';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { TRANSLATE_PREFIX } from '../constants/i18n.constants';
import { auth } from '@ntua-saas-10/web/firebase';

const { common } = TransHolders;

export const useHeaderlLinks = () => {
  const [user] = useAuthState(auth);
  const { t } = useTranslation('translation', TRANSLATE_PREFIX.COMMON);

  const links = useMemo(() => {
    return user
      ? [
          { label: t(common.home), path: AppRoutes.Home },
          { label: t(common.logout), path: AppRoutes.Home },
          { label: t(common.dashboard), path: AppRoutes.Dashboard },
        ]
      : [
          { label: t(common.home), path: AppRoutes.Home },
          { label: t(common.login), path: AppRoutes.Auth },
        ];
  }, [user, t]);

  return links;
};
