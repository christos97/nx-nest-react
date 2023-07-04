import React, { Suspense, useEffect } from 'react';

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
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNotify } from '@ntua-saas-10/web/hooks';
import {ToastMessage} from "@ntua-saas-10/web/ui/toast";

export const App: React.FC = () => {
  const headerLinks = useHeaderlLinks();
  const appRoutes = useAppRoutes();

  const notifications = useNotify();

  useEffect(() => {
    if (notifications) {
      for (const n of notifications) {
        toast(ToastMessage({ title: n.data.title, message: n.data.message }), { type: n.type });
      }
    }
  }, [notifications]);

  return (
    <div>
      <UiHeader {...HeaderProps} links={headerLinks}>
        <ChangeLanguage langs={SUPPORTED_LANGUAGES} />
      </UiHeader>
      <Suspense fallback={<UiProgressSpinner />}>{appRoutes}</Suspense>
    </div>
  );
};

export default App;
