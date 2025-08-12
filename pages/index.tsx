import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {GetServerSideProps} from 'next';
import About from '@/ui/sections/home-page/About';
import Products from '@/ui/sections/home-page/Products';
import Footer from '@/components/footer/Footer';
import Opportunities from '@/ui/sections/home-page/Opportunities';
import Partners from '@/ui/sections/home-page/Partners';
import ContactUs from '@/ui/sections/home-page/ContactUs';
import dynamic from 'next/dynamic';
import i18nConfig from '../next-i18next.config';
import Header from '@/components/header/Header';
import Head from 'next/head';
import Advantages from '@/ui/sections/home-page/Advantages';

const Hero = dynamic(() => import('@/ui/sections/home-page/Hero'), {
  ssr: false,
});

const LelitAd = dynamic(() => import('@/ui/sections/home-page/LelitAdd'), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Head>
        <title>SET</title>
        <meta property='og:title' content='SET' key='title' />
      </Head>
      <main className='sm:h-[calc(100vh-91px)] h-[482px]'>
        <Header />
        <Hero />
        <About />
        <Products />
        <LelitAd />
        <Opportunities />
        {/*<Advantages />*/}
        <Partners />
        <ContactUs />
        <Footer />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({locale}) => {
  return {
    props: {
      ...(await serverSideTranslations(
        locale ?? 'ru',
        ['common', 'main'],
        i18nConfig
      )),
    },
  };
};
