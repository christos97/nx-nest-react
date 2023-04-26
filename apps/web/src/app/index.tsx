import { Route, Routes } from 'react-router-dom';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthState } from 'react-firebase-hooks/auth';

import Auth from './pages/auth';
import Home from './pages/home';

import {
  SUPPORTED_LANGUAGES,
  TRANSLATE_PREFIX,
} from './constants/i18n.constants';
import {
  APP_TITLE,
  LOGO_ALT,
  LOGO_HEIGHT,
  LOGO_SRC,
  LOGO_WIDTH,
} from './constants/app.constants';
import { TransHolders } from './constants/translations.constants';

import { ChangeLanguage } from '@ntua-saas-10/web/features';
import { UiHeader } from '@ntua-saas-10/web/ui';
import { auth } from '@ntua-saas-10/web/firebase';

import { AppRoutes } from './routes';

import './assets/styles/globals.css';
import '@fontsource/inter';

const { common } = TransHolders;
export function App() {
  const [user] = useAuthState(auth);
  const { t } = useTranslation('translation', TRANSLATE_PREFIX.COMMON);
  const links = useMemo(() => {
    return user
      ? [
          { label: t(common.home), path: AppRoutes.Home },
          { label: t(common.logout), path: AppRoutes.Home },
        ]
      : [
          { label: t(common.home), path: AppRoutes.Home },
          { label: t(common.login), path: AppRoutes.Auth },
        ];
  }, [user, t]);

  return (
    <div>
      <UiHeader
        brand={APP_TITLE}
        logoSrc={LOGO_SRC}
        logoAlt={LOGO_ALT}
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        links={links}
      >
        <ChangeLanguage langs={SUPPORTED_LANGUAGES} />
      </UiHeader>
      <Routes>
        <Route path={AppRoutes.Home} element={<Home />} />
        <Route path={AppRoutes.Auth} element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
