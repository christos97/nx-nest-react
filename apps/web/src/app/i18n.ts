import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
} from './constants/i18n.constants';
import { I18nService } from './constants/services.constants';

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
    defaultNS: 'translation',
  });

export default i18n;
