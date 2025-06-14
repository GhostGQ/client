'use client';

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
import {useProduct} from '@/hooks/useProducts';
import {useRouter} from 'next/router';
import ProductInfo from '@/ui/sections/products/ProductInfo';
import SuggestionProducts from '@/ui/sections/products/SuggestionProducts';
import Head from 'next/head';

const Product = () => {
  const router = useRouter();
  const {t, i18n} = useTranslation('products');
  const lang = i18n.language?.startsWith('ru') ? 'ru' : 'uz';
  const {data} = useProduct(router.query.id as string);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <Head>
        <title>{lang === 'uz' ?  data?.product?.title_uz : data?.product?.title_ru}</title>
        <meta property='og:title' content='SET' key='title' />
      </Head>
      <main>
        <Header />
        <PageHeader
          title={t('header.title')}
          subtitle={t('header.subtitle')}
          product={
            lang === 'uz' ? data?.product?.title_uz : data?.product?.title_ru
          }
        />
        {data?.product && <ProductInfo product={data.product} />}
        <SuggestionProducts />
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

export default Product;
