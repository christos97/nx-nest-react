import { Route, Routes } from 'react-router-dom';

import { SUPPORTED_LANGUAGES } from './constants/i18n.constants';
import {
  APP_TITLE,
  LOGO_ALT,
  LOGO_HEIGHT,
  LOGO_SRC,
  LOGO_WIDTH,
} from './constants/app.constants';
import { useHeaderlLinks } from './hooks/useHeaderlLinks.hook';

import { ChangeLanguage } from '@ntua-saas-10/web/features';
import { UiHeader } from '@ntua-saas-10/web/ui';

import { AppRoutes } from './routes';
import Auth from './pages/auth';
import Home from './pages/home';
import Dashboard from './pages/dashboard';

import './assets/styles/globals.css';
import '@fontsource/inter';

export const App: React.FC = () => {
  const HEADER_LINKS = useHeaderlLinks();
  return (
    <div>
      <UiHeader
        brand={APP_TITLE}
        logoSrc={LOGO_SRC}
        logoAlt={LOGO_ALT}
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        links={HEADER_LINKS}
      >
        <ChangeLanguage langs={SUPPORTED_LANGUAGES} />
      </UiHeader>
      <Routes>
        <Route path={AppRoutes.Home} element={<Home />} />
        <Route path={AppRoutes.Auth} element={<Auth />} />
        <Route path={AppRoutes.Dashboard} element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default App;
