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
import {useRouter} from 'next/router';
import Head from 'next/head';
import {useArticle} from "@/hooks/useArticles";
import ArticleInfo from "@/ui/sections/news/ArticleInfo";

const Product = () => {
    const router = useRouter();
    const {i18n} = useTranslation('common');
    const lang = i18n.language?.startsWith('ru') ? 'ru' : i18n.language?.startsWith('uz') ? 'uz' : 'en';
    const {data} = useArticle(router.query.id as string);
    const title = lang === 'ru' ? data?.short_ru ?? '' : lang === 'uz' ? data?.short_uz ?? '' : data?.short_en ?? ''
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta property='og:title' content='SET' key='title'/>
            </Head>
            <main>
                <Header/>
                <PageHeader
                    title={title}
                    product={
                        lang === 'uz' ? data?.short_uz : lang === 'ru' ? data?.short_ru : data?.short_en
                    }
                />
                {data && <ArticleInfo article={data}/>}
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
                ['common', 'main', 'products'],
                i18nConfig
            )),
        },
    };
};

export default Product;
