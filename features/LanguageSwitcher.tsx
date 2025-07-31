'use client';

import {useRouter} from 'next/router';
import Cookies from 'js-cookie';

const LanguageSwitcher = ({isMain}: {isMain: boolean}) => {
  const router = useRouter();
  const {locale, asPath} = router;

  const changeLanguage = (lng: string) => {
    if (locale === lng) return;
    Cookies.set('NEXT_LOCALE', lng);
    router.push(asPath, asPath, {locale: lng});
  };

  return (
    <div
      className={`flex items-center gap-2 ${
        isMain ? 'text-white' : 'text-[#2A3F87]'
      } text-sm font-medium`}
    >
      <button
        onClick={() => changeLanguage('ru')}
        className={`transition-opacity text-[16px] cursor-pointer ${
          locale === 'ru' ? 'opacity-100' : 'opacity-40'
        }`}
      >
        Рус
      </button>

      <div className={`w-px h-5 ${
        isMain ? 'bg-white' : 'bg-[#2A3F87]'
      }`} />

      <button
        onClick={() => changeLanguage('uz-Latn')}
        className={`transition-opacity text-[16px] cursor-pointer ${
          locale === 'uz-Latn' ? 'opacity-100' : 'opacity-40'
        }`}
      >
        O‘zb
      </button>

      <div className={`w-px h-5 ${
        isMain ? 'bg-white' : 'bg-[#2A3F87]'
      }`} />

      <button
        onClick={() => changeLanguage('en')}
        className={`transition-opacity text-[16px] cursor-pointer ${
          locale === 'en' ? 'opacity-100' : 'opacity-40'
        }`}
      >
        En
      </button>
    </div>
  );
};

export default LanguageSwitcher;
