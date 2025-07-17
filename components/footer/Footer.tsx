import {FaFacebookF, FaInstagram, FaYoutube} from 'react-icons/fa';
import {BiLogoTelegram} from 'react-icons/bi';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useTranslation} from 'next-i18next';
import {useEffect, useState} from 'react';
import EmailSubscribe from './ui/EmailSubscribe';

const Footer = () => {
  const {t} = useTranslation('common');
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const navItems = [
    {key: 'nav.home', path: '/'},
    {key: 'nav.about', path: '/about'},
    {key: 'nav.products', path: '/products'},
    {key: 'nav.contacts', path: '/contacts'},
  ];

  return (
    <>
      <EmailSubscribe />
      <footer className='pt-10 pb-3 bg-[rgba(2,3,8,1)]'>
        <div className='container pb-7 flex flex-wrap justify-between items-center'>
          <div className='max-w-[140px] w-full order-1'>
            <img src='/logo.png' alt='Logo' className='w-full' />
          </div>
          <ul className='flex flex-wrap w-full lg:w-auto justify-center text-white text-[16px] font-medium md:gap-7 gap-3 lg:order-2 order-3 mt-5 lg:mt-0'>
            {navItems.map(item => (
              <li key={item.key}>
                <Link
                  href={item.path}
                  className={`hover:text-blue-300 transition whitespace-nowrap ${
                    router.pathname === item.path
                      ? 'text-white font-medium'
                      : ''
                  }`}
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='container text-white flex md:flex-row flex-col justify-between items-center pt-8 border-t border-[rgba(247,247,248,0.3)]'>
          <p className='text-[12px] md:text-[18px]'>{t('footer.privacy')}</p>
          <div className='flex items-center gap-3'>
            <p className='text-[12px] md:text-[18px]'>
              {t('footer.copyrights')}
            </p>
            <img className='w-[70px]' src='/sag_logo.png' alt='' />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
