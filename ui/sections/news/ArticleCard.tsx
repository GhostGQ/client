import {Image} from '@mantine/core';
import Link from 'next/link';
import {useTranslation} from 'react-i18next';
import {formatDate} from "@/features/formatDate";

const ArticleCard = ({article}: { article: any }) => {
    const {i18n} = useTranslation();
    const language = i18n.language.startsWith('ru') ? 'ru' : i18n.language.startsWith('uz') ? 'uz' : 'en';
    const slug = language === 'ru' ? article.slug_ru : language === 'uz' ? article.slug_uz : article.slug_ru
    const regex = /(<([^>]+)>)/gi;
    const dangerousBody = language === 'ru' ? article?.body_ru : language === 'uz' ? article?.body_uz : article?.body_en
    let body = dangerousBody?.replace(regex, " ") ?? '';
    body = body.length > 50 ? `${body.slice(0, 50)}...` : body

    return (
        <Link
            href={{
                pathname: `/news/${slug}`,
                query: {id: article.id},
            }}
            prefetch={false}
            className='min-h-[300px]'
        >
            <Image
                src={article?.img}
                className='w-fit h-[270px]'
            />
            <div className='mt-4'>
                <div>
                    <h2 className='text-[20px] font-semibold text-[#081B24]'>
                        {language === 'uz' ? article.short_uz : language === 'ru' ? article.short_ru : article.short_en}
                    </h2>
                    <p className='text-[16px] text-[#7B8488] font-medium'>{body}</p>

                    <p className='text-[16px] text-[#081B24] font-medium'>{formatDate(article.created_at)}</p>
                </div>
            </div>
        </Link>
    );
};

export default ArticleCard;
