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
import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { appWithTranslation } from 'next-i18next';
import { Manrope } from 'next/font/google';
import Header from '@/components/header/Header';
import i18nConfig from '../next-i18next.config';
import { useRouter } from 'next/router';

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700'],
  variable: '--font-manrope',
});

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isAdminRoute = router.pathname.startsWith('/admin');

  return (
    <MantineProvider>
      <div className={`main-wrapper ${manrope.className}`}>
        {!isAdminRoute && <Header />}
        <Component {...pageProps} />
      </div>
    </MantineProvider>
  );
}

export default appWithTranslation(App, i18nConfig);
