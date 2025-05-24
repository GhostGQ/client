import '@/styles/globals.css';
import '../styles/admin.css';
import '../styles/admin-login.css';
import '../styles/admin-dashboard.css';
import '../styles/admin-layout.css';
import '../styles/admin-products.css';
import '../styles/admin-categories.css';
import '@/styles/products.css';
import '@/styles/requests.css';
import 'leaflet/dist/leaflet.css';
import '@mantine/core/styles.css';
import type {AppProps} from 'next/app';
import {MantineProvider, createTheme} from '@mantine/core';
import {appWithTranslation} from 'next-i18next';
import Header from '@/components/header/Header';
import i18nConfig from '../next-i18next.config';

const theme = createTheme({});

function App({Component, pageProps}: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <div>
        <Header />
        <Component {...pageProps} />
      </div>
    </MantineProvider>
  );
}

export default appWithTranslation(App, i18nConfig);
