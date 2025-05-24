'use client';

import {Accordion, Box, Button, Divider, Title} from '@mantine/core';
import {useTranslation} from 'next-i18next';
import {useFilterStore} from './useFilterStore';
import {mockFilters} from '@/data/filters';
import {FaArrowRightLong} from 'react-icons/fa6';

export const FilterAccordion = () => {
  const {t, i18n} = useTranslation();
  const language = i18n.language.startsWith('uz') ? 'uz' : 'ru';

  const {selectedFilters, toggleFilter, resetFilters} = useFilterStore();

  return (
    <Accordion
      className='p-1 bg-[#F3F3F3] w-full sm:block flex flex-col justify-between sm:h-fit h-[85vh]'
      variant='default'
      multiple
      defaultValue={[]}
    >
      <Box className='sm:h-fit overflow-auto'>
        <h4 className='m-4 text-[#2A3F87] text-[20px] font-semibold'>Фильтр</h4>
        {mockFilters.map(filter => (
          <Accordion.Item
            key={filter.id}
            value={filter.id}
            bg={'#fff'}
            className='mt-1 h-fit'
          >
            <Accordion.Control
              className='font-semibold text-base'
              style={{fontSize: '18px', fontWeight: '500'}}
            >
              {filter.label[language]}
            </Accordion.Control>
            <Accordion.Panel className='space-y-2 px-2'>
              {filter.options.map(option => {
                const checked =
                  selectedFilters[filter.id]?.includes(option.value) || false;

                return (
                  <label
                    style={{fontSize: '16px'}}
                    key={option.value}
                    className='flex items-center gap-2 cursor-pointer mt-3 first:mt-0'
                  >
                    <input
                      type='checkbox'
                      checked={checked}
                      onChange={() => toggleFilter(filter.id, option.value)}
                      color='#43A1D0'
                      className='accent-blue-500 w-5 h-5 cursor-pointer bg-[#43A1D0]'
                    />
                    <div className='flex justify-between w-full'>
                      <span>{option.label[language]} </span>
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
        <Divider m={'20px 0 12px'} />
        <Button
          radius='xl'
          fullWidth
          size='lg'
          bg={'#2BA8FC'}
          styles={{label: {fontSize: '16px', fontWeight: 500}}}
          rightSection={<FaArrowRightLong color='#fff' />}
        >
          Показать
        </Button>
        <Button
          onClick={resetFilters}
          radius='xl'
          fullWidth
          variant='transparent'
          size='lg'
          mt={'4px'}
          styles={{label: {fontSize: '16px', fontWeight: 500}}}
        >
          Сбросить все
        </Button>
      </Box>
    </Accordion>
  );
};
