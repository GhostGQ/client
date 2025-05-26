import Footer from '@/components/footer/Footer';
import PageHeader from '@/components/page-header/PageHeader';
import ContactUs from '@/ui/sections/home-page/ContactUs';
import Partners from '@/ui/sections/home-page/Partners';
import {GetServerSideProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {useTranslation} from 'react-i18next';
import i18nConfig from '../../../next-i18next.config';
import {useEffect, useState} from 'react';
import Header from '@/components/header/Header';
import {useProduct} from '@/lib/hooks/useProducts';
import {useRouter} from 'next/router';

const Product = () => {
  const router = useRouter();
  const {t} = useTranslation('products');
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const {data, isLoading} = useProduct(router.query.id as string);

  if (!mounted) return null;

  return (
    <>
      <Header />
      <PageHeader
        title={t('header.title')}
        subtitle={t('header.subtitle')}
        product='Poplin'
      />

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

export default Product;
