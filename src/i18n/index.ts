import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { enLang, plLang, ruLang, ukLang } from './locales';

const resources = {
  en: {
    translation: enLang,
  },
  pl: {
    translation: plLang,
  },
  ru: {
    translation: ruLang,
  },
  uk: {
    translation: ukLang,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'pl', 'ru', 'uk'],

    interpolation: {
      escapeValue: false,
    },

    detection: {
      lookupLocalStorage: 'language',
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;
