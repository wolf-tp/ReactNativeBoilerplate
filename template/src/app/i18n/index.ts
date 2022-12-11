import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';

import en from './translations/en.json';
import vi from './translations/vi.json';

export const langs = {
  en,
  vi,
};

const resources = Object.keys(langs).reduce((prev, curr) => {
  return {
    ...prev,
    [curr]: { translation: langs[curr as keyof typeof langs] },
  };
}, {} as typeof langs);

i18n.use(initReactI18next).init({
  resources,
  compatibilityJSON: 'v3',
  react: {
    useSuspense: false,
  },
  lng: 'en',
});

export default i18n;
