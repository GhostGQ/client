import Footer from '@/components/footer/Footer';
import PageHeader from '@/components/page-header/PageHeader';
import ContactUs from '@/ui/sections/home-page/ContactUs';
import Partners from '@/ui/sections/home-page/Partners';
import {GetServerSideProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {useTranslation} from 'next-i18next';
import i18nConfig from '../../next-i18next.config';
import Catalog from '@/ui/sections/products/Catalog';
import Header from '@/components/header/Header';
import Head from 'next/head';

const index = () => {
  const {t, i18n} = useTranslation('products');
  const lang = i18n.language.startsWith('uz') ? 'uz' : 'ru';

  return (
    <>
      <Head>
        <title>{lang === 'uz' ? 'Mahsulotlar' : 'Продукция'}</title>
        <meta
          property='og:title'
          content={lang === 'uz' ? 'Mahsulotlar' : 'Продукция'}
          key='title'
        />
      </Head>
      <main>
        <Header />
        <PageHeader title={t('header.title')}/>
        <Catalog />
        <Partners />
        <ContactUs />
        <Footer />
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({locale}) => {
  return {
    props: {
      ...(await serverSideTranslations(
        locale ?? 'ru',
        ['common', 'main', 'products'],
        i18nConfig
      )),
    },
  };
};

export default index;
