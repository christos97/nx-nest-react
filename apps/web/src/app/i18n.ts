/* eslint-disable import/no-named-as-default-member */
/**
 * Dont edit this file directly.
 * @fileoverview I18n entry point for the app. Uses i18next for localization.
 * @global apps/web/~/i18n.ts
 */
import { env } from '@ntua-saas-10/web/env';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import {
  DEFAULT_LANGUAGE,
  DEFAULT_NAMESPACE,
  SUPPORTED_LANGUAGES,
} from './constants/i18n.constants';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: `${env.VITE_PUBLIC_I18N_SERVICE_URL}/i18n/{{lng}}`,
    },
    supportedLngs: SUPPORTED_LANGUAGES,
    fallbackLng: DEFAULT_LANGUAGE,
    defaultNS: DEFAULT_NAMESPACE,
  });

export default i18n;
