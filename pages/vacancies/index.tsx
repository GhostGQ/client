import Footer from '@/components/footer/Footer';
import PageHeader from '@/components/page-header/PageHeader';
import ContactUs from '@/ui/sections/home-page/ContactUs';
import Partners from '@/ui/sections/home-page/Partners';
import {GetServerSideProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {useTranslation} from 'next-i18next';
import i18nConfig from '../../next-i18next.config';
import Header from '@/components/header/Header';
import Head from 'next/head';
import VacancyList from "@/ui/sections/vacancies/VacancyList";

const index = () => {
    const {t} = useTranslation('common');
    const title = t('nav.vacancies')

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta
                    property='og:title'
                    content={title}
                    key='title'
                />
            </Head>
            <main>
                <Header/>
                <PageHeader title={title}/>
                <VacancyList/>
                <Partners/>
                <ContactUs/>
                <Footer/>
            </main>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({locale}) => {
    return {
        props: {
            ...(await serverSideTranslations(
                locale ?? 'ru',
                ['common', 'main', 'products', 'news'],
                i18nConfig
            )),
        },
    };
};

export default index;
