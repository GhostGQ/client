'use client';

import {useTranslation} from 'react-i18next';
import {memo} from 'react';
import {Article} from "@/hooks/useArticles";
import {Image} from "@mantine/core";
import {formatDate} from "@/features/formatDate";

const VacancyInfo = ({article}: { article?: Article | null }) => {
    const {t, i18n} = useTranslation('common');
    const lang = i18n.language?.startsWith('ru') ? 'ru' : 'uz';

    return (
        <section className='md:py-20 pt-4 pb-10'>
            <h1 className='text-[#2A3F87] text-[20px] font-medium mb-6 text-center md:hidden'>
                {lang === 'uz' ? article?.short_uz : lang === 'ru' ? article?.short_ru : article?.short_en}
            </h1>
            <div className='container flex gap-8 lg:flex-row flex-col'>
                <div className='lg:w-1/2 '>
                    <Image
                        src={article?.img}
                        className='w-fit h-[270px]'
                    />
                    <div>
                        <h2 className='text-[32px] font-semibold text-[#2A3F87]'>
                            {lang === 'uz' ? article?.short_uz : lang === 'ru' ? article?.short_ru : article?.short_en}
                        </h2>
                    </div>

                    <div className='mt-4'>
                        <p className='text-[16px] text-[#7C7C7C]'
                           dangerouslySetInnerHTML={{__html: (lang === 'ru' ? article?.body_ru : lang === 'uz' ? article?.body_uz : article?.body_en) ?? ''}}
                        >
                        </p>
                    </div>

                    <div className='mt-4'>
                        {article?.created_at && <p className='text-[16px] text-[#081B24] font-medium'>{formatDate(article.created_at)}</p>}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default memo(VacancyInfo);
