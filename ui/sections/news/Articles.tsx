'use client';

import ArticleList from './ArticleList';
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";

const Articles = () => {
    const {t} = useTranslation('common')
    const [articleType, setArticleType] = useState<'article' | 'blog'>('article')
    const [mounted, setMounted] = useState(false)
    const activeButtonClasses = 'bg-[#2583B2] text-white'
    const inactiveButtonClasses = 'bg-transparent text-[#7C7C7C]'

    useEffect(() => {
        setMounted(true)
    }, []);

    if(!mounted) return null

    return (
        <section className='md:py-20 py-4 relative'>
            <div className="container flex items-center gap-x-3 mb-16">
                <button
                    className={`rounded-full py-2.5 px-6 border border-[#43A1D0] text-[16px] font-medium ${articleType === 'article' ? activeButtonClasses : inactiveButtonClasses}`}
                    onClick={() => setArticleType('article')}
                >
                    {t('articles')}
                </button>
                <button
                    className={`rounded-full py-2.5 px-6 border border-[#43A1D0] text-[16px] font-medium ${articleType === 'blog' ? activeButtonClasses : inactiveButtonClasses}`}
                    onClick={() => setArticleType('blog')}
                >
                    {t('blog')}
                </button>
            </div>
            <div className='container sm:flex gap-6 relative'>
                <div className='flex-1'>
                    <ArticleList articleType={articleType}/>
                </div>
            </div>
        </section>
    );
};

export default Articles;
