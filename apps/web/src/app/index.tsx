import React, { Suspense } from 'react';

// Consts
import { SUPPORTED_LANGUAGES } from './constants/i18n.constants';
import { HeaderProps } from './constants/app.constants';

// Hooks
import { useHeaderlLinks } from './hooks/useHeaderlLinks.hook';
import { useAppRoutes } from './hooks/useAppRoutes.hook';

// Ui Components
import { UiHeader } from '@ntua-saas-10/web/ui/header';
import { UiProgressSpinner } from '@ntua-saas-10/web/ui/progress-spinner';

// Features
import { ChangeLanguage } from '@ntua-saas-10/web/features/change-language';

import './assets/styles/globals.css';
import '@fontsource/inter';

export const App: React.FC = () => {
  return (
    <div>
      <UiHeader {...HeaderProps} links={useHeaderlLinks()}>
        <ChangeLanguage langs={SUPPORTED_LANGUAGES} />
      </UiHeader>
      <Suspense fallback={<UiProgressSpinner />}>{useAppRoutes()}</Suspense>
    </div>
  );
};

export default App;
