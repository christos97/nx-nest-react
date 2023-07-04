import { ChangeLanguage } from '@ntua-saas-10/web/features/change-language';
import { useNotify } from '@ntua-saas-10/web/hooks';
import { UiHeader } from '@ntua-saas-10/web/ui/header';
import { UiProgressSpinner } from '@ntua-saas-10/web/ui/progress-spinner';
import { ToastMessage } from '@ntua-saas-10/web/ui/toast';
import React, { Suspense, useEffect } from 'react';

import { toast } from 'react-toastify';

import { HeaderProps } from './constants/app.constants';
import { SUPPORTED_LANGUAGES } from './constants/i18n.constants';

import { useAppRoutes } from './hooks/useAppRoutes.hook';
import { useHeaderlLinks } from './hooks/useHeaderlLinks.hook';

import './assets/styles/globals.css';
import '@fontsource/inter';
import 'react-toastify/dist/ReactToastify.css';

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
