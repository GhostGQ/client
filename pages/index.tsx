import Header from '@/components/header/Header';
import {Hero} from '@/ui/sections/home-page/Hero';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {GetServerSideProps} from 'next';
import About from '@/ui/sections/home-page/About';
import Products from '@/ui/sections/home-page/Products';
import Footer from '@/components/footer/Footer';
import LelitAdd from '@/ui/sections/home-page/LelitAdd';
import Opportunities from '@/ui/sections/home-page/Opportunities';
import {useEffect, useState} from 'react';
import Partners from '@/ui/sections/home-page/Partners';
import ContactUs from '@/ui/sections/home-page/ContactUs';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className='sm:h-[calc(100vh-91px)] h-[482px]'>
      <Hero />
      <About />
      <Products />
      <LelitAdd />
      <Opportunities />
      <Partners />
      <ContactUs />
      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({locale}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ru', ['common', 'main'])),
    },
  };
};
