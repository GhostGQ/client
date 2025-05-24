import Footer from '@/components/footer/Footer';
import PageHeader from '@/components/page-header/PageHeader';
import Contacts from '@/ui/sections/contacts/Contacts';
import {GetServerSideProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {useTranslation} from 'next-i18next';
import i18nConfig from '../../next-i18next.config';

const index = () => {
  const {t} = useTranslation('contacts');

  return (
    <>
      <PageHeader title={t('header.title')} subtitle={t('header.subtitle')} />
      <Contacts />
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({locale}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ru', [
        'common',
        'contacts',
        'main',
      ], i18nConfig)),
    },
  };
};

export default index;
