module.exports = {
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'uz-Latn'],
    localeDetection: false,
  },
  react: {useSuspense: false},
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  ns: ['common', 'main', 'contacts', 'about', 'production', 'products', 'blog'],
  fallbackLng: {
    uz: ['uz-Latn'],
    default: ['ru'],
  },
  localePath: './public/locales',
};
