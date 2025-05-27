import path from 'path';
import type { UserConfig } from 'next-i18next';

const config: UserConfig = {
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'uz-Latn'],
    localeDetection: false,
  },
  react: { useSuspense: true },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  ns: ['common', 'main', 'contacts', 'about', 'production', 'products',],
  fallbackLng: 'ru',
  localePath: path.resolve('./public/locales'),
  serializeConfig: false,
  interpolation: {
    escapeValue: false,
  },
};

export default config;
