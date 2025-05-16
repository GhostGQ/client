'use client';

import '@/styles/globals.css';
import '../styles/admin.css';
import '@/styles/products.css';
import '@/styles/requests.css';
import 'leaflet/dist/leaflet.css';
import '@mantine/core/styles.css';
import type {AppProps} from 'next/app';
import {MantineProvider} from '@mantine/core';
import {appWithTranslation} from 'next-i18next';
import {Manrope} from 'next/font/google';
import Header from '@/components/header/Header';

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'], // лучше указать и кириллицу для русского
  weight: ['400', '500', '700'], // если нужно
  variable: '--font-manrope', // по желанию
});

function App({Component, pageProps}: AppProps) {
  return (
    <MantineProvider>
      <div className={manrope.className}>
        <Header />
        <Component {...pageProps} />
      </div>
    </MantineProvider>
  );
}

export default appWithTranslation(App);
