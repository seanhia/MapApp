import i18n from 'i18next';
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'; //translation imports 
import es from './locales/es.json';
import zh from './locales/zh.json';

i18n.use(initReactI18next).init({
    lng: 'en', //default language
    fallbackLng: 'en', //fallback language
    resources: { //uses corresponding file
      en: { translation: en },
      es: { translation: es },
      zh: { translation: zh },
    },
    interpolation: {
      escapeValue: false,
    },
  });
  
  export default i18n;