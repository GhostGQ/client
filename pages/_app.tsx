import '@/styles/globals.css';
import '../styles/admin.css';
import '../styles/admin-login.css';
import '../styles/admin-layout.css';
import '../styles/admin-products.css';
import '../styles/admin-categories.css';
import '../styles/admin-requests.css';
import '../styles/admin-filters.css';
import '@/styles/products.css';
import '@/styles/requests.css';
import 'leaflet/dist/leaflet.css';
import '@mantine/core/styles.css';
import type {AppProps} from 'next/app';
import {MantineProvider, createTheme} from '@mantine/core';
import {appWithTranslation} from 'next-i18next';
import i18nConfig from '../next-i18next.config';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import {useState} from 'react';
import {ToastContainer} from 'react-toastify';

const theme = createTheme({});

function App({Component, pageProps}: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ToastContainer
          position='top-right'
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme='light'
        />
      </QueryClientProvider>
    </MantineProvider>
  );
}

export default appWithTranslation(App, i18nConfig);
