import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ruCommon from '@/public/locales/ru/common.json';
import ruMain from '@/public/locales/ru/main.json';
import ruAbout from '@/public/locales/ru/about.json';
import ruContacts from '@/public/locales/ru/contacts.json';
import ruProduction from '@/public/locales/ru/production.json';
import ruProducts from '@/public/locales/ru/products.json';
import ruBlog from '@/public/locales/ru/blog.json';

import uzCommon from '@/public/locales/uz-Latn/common.json';
import uzMain from '@/public/locales/uz-Latn/main.json';
import uzAbout from '@/public/locales/uz-Latn/about.json';
import uzContacts from '@/public/locales/uz-Latn/contacts.json';
import uzProduction from '@/public/locales/uz-Latn/production.json';
import uzProducts from '@/public/locales/uz-Latn/products.json';
import uzBlog from '@/public/locales/uz-Latn/blog.json';

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru',
    supportedLngs: ['ru', 'uz-Latn'],
    lng: 'ru', // можешь заменить на динамическое значение
    resources: {
      ru: {
        common: ruCommon,
        main: ruMain,
        about: ruAbout,
        contacts: ruContacts,
        production: ruProduction,
        products: ruProducts,
        blog: ruBlog,
      },
      'uz-Latn': {
        common: uzCommon,
        main: uzMain,
        about: uzAbout,
        contacts: uzContacts,
        production: uzProduction,
        products: uzProducts,
        blog: uzBlog,
      },
    },
    ns: ['common', 'main', 'about', 'contacts', 'production', 'products', 'blog'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
