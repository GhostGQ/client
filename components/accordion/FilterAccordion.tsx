'use client';

import {Accordion, Box, Button, Divider, Loader, Text} from '@mantine/core';
import {useTranslation} from 'next-i18next';
import {useMemo} from 'react';
import {useFilterStore} from './useFilterStore';
import {FaArrowRightLong} from 'react-icons/fa6';
import {useQueries} from '@tanstack/react-query';

interface FilterOption {
  id: number;
  value: string;
  label_ru: string;
  label_uz: string;
  count: number;
}

const FILTER_KEYS = [
  {
    id: 'category',
    ru: 'Категория',
    uz: 'Kategoriya',
    filterKey: 'category_ids',
  },
  {id: 'width', ru: 'Ширина', uz: 'Kenglik', filterKey: 'width_ids'},
  {id: 'density', ru: 'Плотность', uz: 'Zichlik', filterKey: 'density_ids'},
  {
    id: 'dyeing',
    ru: 'Вид крашения',
    uz: 'Boʻyoqlash turi',
    filterKey: 'dyeing_ids',
  },
  {
    id: 'composition',
    ru: 'Состав',
    uz: 'Tarkibi',
    filterKey: 'composition_ids',
  },
] as const;

type FilterKey = (typeof FILTER_KEYS)[number]['id'];

export const FilterAccordion = ({height = '85vh'}) => {
  const {i18n, t} = useTranslation();
  const lang = i18n.language.startsWith('uz') ? 'uz' : 'ru';

  const {tempFilters, toggleTempFilter, applyFilters, resetFilters} =
    useFilterStore();

  const filterQueries = useQueries({
    queries: FILTER_KEYS.map(({id}) => ({
      queryKey: ['filter', id],
      queryFn: async (): Promise<FilterOption[]> => {
        const res = await fetch(`/api/filters/${id}`);
        if (!res.ok) throw new Error(`Ошибка загрузки фильтра: ${id}`);
        return res.json();
      },
      staleTime: 5 * 60 * 1000,
    })),
  });

  const isLoading = filterQueries.some(q => q.isLoading);
  const isError = filterQueries.some(q => q.isError);

  const filters = useMemo(() => {
    const result: Record<FilterKey, FilterOption[]> = {} as any;
    FILTER_KEYS.forEach(({id}, i) => {
      result[id] = filterQueries[i].data || [];
    });
    return result;
  }, [filterQueries]);

  if (isLoading) {
    return (
      <Box className='p-4 text-center'>
        <Loader color='blue' />
        <Text mt='md'>{t('Загрузка фильтров...')}</Text>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box className='p-4 text-center'>
        <Text color='red'>{t('Ошибка загрузки фильтров.')}</Text>
      </Box>
    );
  }

  return (
    <Accordion
      className={`p-1 bg-[#F3F3F3] w-full sm:block flex flex-col justify-between sm:h-fit h-[${height}]`}
      variant='default'
      multiple
    >
      <Box className='sm:h-fit overflow-auto'>
        <h4 className='m-4 text-[#2A3F87] text-[20px] font-semibold'>
          {lang === 'uz' ? 'Filtr' : 'Фильтр'}
        </h4>

        {FILTER_KEYS.map(({id, ru, uz, filterKey}, i) => (
          <Accordion.Item key={id} value={id} bg='#fff' className='mt-1 h-fit'>
            <Accordion.Control
              className='font-semibold text-base'
              style={{fontSize: '18px', fontWeight: '500'}}
            >
              {lang === 'uz' ? uz : ru}
            </Accordion.Control>
            <Accordion.Panel className='space-y-2 px-2'>
              {filters[id].map(option => {
                return (
                  <label
                    key={option.id}
                    className='flex items-center gap-2 cursor-pointer mt-3 first:mt-0'
                    style={{fontSize: '16px'}}
                  >
                    <input
                      type='checkbox'
                      checked={
                        tempFilters[filterKey]?.includes(
                          option.id.toString()
                        ) || false
                      }
                      onChange={() =>
                        toggleTempFilter(filterKey, option.id.toString())
                      }
                      className='accent-blue-500 w-5 h-5 cursor-pointer'
                    />
                    <div className='flex justify-between w-full'>
                      <span>
                        {lang === 'uz' ? option.label_uz : option.label_ru}
                      </span>
                      <span className='text-gray-500'>{option.count}</span>
                    </div>
                  </label>
                );
              })}
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Box>

      <Box>
        <Divider m='20px 0 12px' />
        <Button
          radius='xl'
          fullWidth
          size='lg'
          bg='#2BA8FC'
          onClick={applyFilters}
          styles={{label: {fontSize: '16px', fontWeight: 500}}}
          rightSection={<FaArrowRightLong color='#fff' />}
        >
          {lang === 'uz' ? "Ko'rsatish" : 'Показать'}
        </Button>
        <Button
          onClick={resetFilters}
          radius='xl'
          fullWidth
          variant='transparent'
          size='lg'
          mt='4px'
          styles={{label: {fontSize: '16px', fontWeight: 500}}}
        >
          {lang === 'uz' ? 'Hammasini tiklash' : 'Сбросить всё'}
        </Button>
      </Box>
    </Accordion>
  );
};
