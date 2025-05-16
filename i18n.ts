import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpBackend) // загружает переводы из файлов
  .use(LanguageDetector) // определяет язык из браузера, cookie и т.д.
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru',
    supportedLngs: ['ru', 'uz-Latn'],
    ns: ['common', 'main', 'about', 'contacts', 'production', 'products', 'blog'], // укажи все неймспейсы
    defaultNS: 'common',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // путь к твоим локалям
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
