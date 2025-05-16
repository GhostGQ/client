import Footer from '@/components/footer/Footer';
import PageHeader from '@/components/page-header/PageHeader';
import Contacts from '@/ui/sections/contacts/Contacts';
import {GetServerSideProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {useTranslation} from 'next-i18next';

const index = () => {
  const {t} = useTranslation('contacts');

  return (
    <div>
      <PageHeader title={t('header.title')} subtitle={t('header.subtitle')} />
      <Contacts />
      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({locale}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ru', [
        'common',
        'contacts',
        'main',
      ])),
    },
  };
};

export default index;
