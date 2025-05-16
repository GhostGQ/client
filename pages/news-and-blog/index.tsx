import Footer from '@/components/footer/Footer';
import PageHeader from '@/components/page-header/PageHeader';
import ContactUs from '@/ui/sections/home-page/ContactUs';
import Partners from '@/ui/sections/home-page/Partners';
import {GetServerSideProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

const index = () => {
  const [mounted, setMounted] = useState(false);
  const {t} = useTranslation('blog');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <PageHeader title={t('header.title')} subtitle={t('header.subtitle')} />

      <Partners />
      <ContactUs />
      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({locale}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ru', [
        'common',
        'main',
        'blog',
      ])),
    },
  };
};

export default index;
