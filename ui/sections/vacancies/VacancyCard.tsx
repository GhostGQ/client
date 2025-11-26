import {Image} from '@mantine/core';
import Link from 'next/link';
import {useTranslation} from 'react-i18next';
import {formatDate} from "@/features/formatDate";

const VacancyCard = ({vacancy}: { vacancy: any }) => {
    const {i18n} = useTranslation();
    const language = i18n.language.startsWith('ru') ? 'ru' : i18n.language.startsWith('uz') ? 'uz' : 'en';
    const regex = /(<([^>]+)>)/gi;
    const dangerousBody = language === 'ru' ? vacancy?.body_ru : language === 'uz' ? vacancy?.body_uz : vacancy?.body_en
    let body = dangerousBody?.replace(regex, " ") ?? '';
    body = body.length > 50 ? `${body.slice(0, 50)}...` : body

    return (
        <Link
            href={{
                pathname: `/vacancies/${vacancy.id}`,
                query: {id: vacancy.id},
            }}
            prefetch={false}
            className='min-h-[300px]'
        >
            <Image
                src={vacancy?.img}
                className='w-fit h-[270px]'
            />
            <div className='mt-4'>
                <div>
                    <h2 className='text-[20px] font-semibold text-[#081B24]'>
                        {language === 'uz' ? vacancy.short_uz : language === 'ru' ? vacancy.short_ru : vacancy.short_en}
                    </h2>
                    <p className='text-[16px] text-[#7B8488] font-medium'>{body}</p>

                    <p className='text-[16px] text-[#081B24] font-medium'>{formatDate(vacancy.created_at)}</p>
                </div>
            </div>
        </Link>
    );
};

export default VacancyCard;
