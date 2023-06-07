/**
 * Dont edit this file directly.
 * @fileoverview I18n entry point for the app. Uses i18next for localization.
 * @global apps/web/~/i18n.ts
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

import {
  DEFAULT_LANGUAGE,
  DEFAULT_NAMESPACE,
  SUPPORTED_LANGUAGES,
} from './constants/i18n.constants';
import { Services } from '@ntua-saas-10/shared-api-interfaces';

const { I18n: I18nService } = Services;
i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: `${I18nService.baseUrl}/${I18nService.paths.i18n}/{{lng}}`,
    },
    supportedLngs: SUPPORTED_LANGUAGES,
    fallbackLng: DEFAULT_LANGUAGE,
    defaultNS: DEFAULT_NAMESPACE,
  });

export default i18n;
