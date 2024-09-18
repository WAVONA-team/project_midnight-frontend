import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';

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

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
