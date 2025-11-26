'use client';

import {useTranslation} from 'next-i18next';
import {useState} from 'react';
import {useArticles} from "@/hooks/useArticles";
import ArticleCard from "@/ui/sections/news/ArticleCard";
import {Button} from "@mantine/core";

const ArticleList = ({articleType}: {articleType: 'article' | 'blog'}) => {
    const {i18n} = useTranslation();
    const language = i18n.language;
    const [page, setPage] = useState(1);
    const {data, isLoading, isError} = useArticles({page, articleType});
    const articles = data?.articles || [];
    const total = data?.total || 0;
    const limit = data?.limit || 12;
    const hasMore = page * limit < total;

    if (isError) {
        return <div className='text-center text-red-500'>Ошибка загрузки</div>;
    }

    if (isLoading) {
        return <div className='text-center'>Загрузка...</div>;
    }

    return (
        <div className='flex flex-col gap-6'>
            <div className='grid lg:grid-cols-3 grid-cols-1 gap-4 w-full h-fit'>
                {articles.length === 0 ? (
                    <div className='text-center text-gray-500 col-span-full'>
                        {language === 'uz' ? 'Yangiliklar topilmadi' : 'Статьи не найдены'}
                    </div>
                ) : (
                    articles.map((article: any) => (
                        <ArticleCard key={article.id} article={article}/>
                    ))
                )}
            </div>

            {hasMore && (
                <Button
                    onClick={() => setPage(prev => prev + 1)}
                    className='mx-auto mt-6'
                    variant='outline'
                    size='md'
                >
                    {language === 'uz' ? 'Yana ko‘rsatish' : 'Показать ещё'}
                </Button>
            )}
        </div>
    );
};

export default ArticleList;
