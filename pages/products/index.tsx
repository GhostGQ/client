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

const index = () => {
  const {t} = useTranslation('products');

  return (
    <>
      <Header />
      <PageHeader title={t('header.title')} subtitle={t('header.subtitle')} />
      <Catalog />
      <Partners />
      <ContactUs />
      <Footer />
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
