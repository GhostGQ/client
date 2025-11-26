'use client';

import {useTranslation} from 'next-i18next';
import {useState} from 'react';
import {Button} from "@mantine/core";
import {useVacancies} from "@/hooks/useVacancies";
import VacancyCard from "@/ui/sections/vacancies/VacancyCard";

const VacancyList = () => {
    const {i18n} = useTranslation();
    const language = i18n.language;
    const [page, setPage] = useState(1);
    const {data, isLoading, isError} = useVacancies({page});
    const vacancies = data?.vacancies || [];
    const total = data?.total || 0;
    const limit = data?.limit || 12;
    const hasMore = page * limit < total;

    if (isError) {
        return <div className='md:py-20 py-4 relative text-center text-red-500'>Ошибка загрузки</div>;
    }

    if (isLoading) {
        return <div className='md:py-20 py-4 relative text-center'>Загрузка...</div>;
    }

    return (
        <section className='md:py-20 py-4 relative'>
            <div className='container sm:flex gap-6 relative'>
                <div className='flex-1'>
                    <div className='flex flex-col gap-6'>
                        <div className='grid lg:grid-cols-3 grid-cols-1 gap-4 w-full h-fit'>
                            {vacancies.length === 0 ? (
                                <div className='text-center text-gray-500 col-span-full'>
                                    {language === 'uz' ? 'Ma\'lumot topilmadi' : language === 'ru' ? 'Данные не найдены' : 'No data'}
                                </div>
                            ) : (
                                vacancies.map((vacancy: any) => (
                                    <VacancyCard key={vacancy.id} vacancy={vacancy}/>
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
                </div>
            </div>
        </section>
    );
};

export default VacancyList;
