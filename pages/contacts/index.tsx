import Footer from '@/components/footer/Footer';
import PageHeader from '@/components/page-header/PageHeader';
import Contacts from '@/ui/sections/contacts/Contacts';
import {GetServerSideProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {useTranslation} from 'next-i18next';
import i18nConfig from '../../next-i18next.config';
import Header from '@/components/header/Header';
import Head from 'next/head';

const index = () => {
  const {t} = useTranslation('contacts');

  return (
    <>
      <Head>
        <title>{t('header.title')}</title>
        <meta property='og:title' content={t('header.title')} key='title' />
      </Head>
      <main>
        <Header />
        <PageHeader title={t('header.title')} subtitle={t('header.subtitle')} />
        <Contacts />
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
        ['common', 'contacts', 'main'],
        i18nConfig
      )),
    },
  };
};

export default index;
