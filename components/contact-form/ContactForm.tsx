'use client';

import {useForm, Controller} from 'react-hook-form';
import {Button, Checkbox, Textarea, TextInput} from '@mantine/core';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {FaArrowRightLong} from 'react-icons/fa6';
import {useTranslation} from 'next-i18next';

type FormValues = {
  name: string;
  phone: string;
  comment: string;
  agree: boolean;
};

const ContactForm = () => {
  const {t} = useTranslation('common');
  const {
    control,
    handleSubmit,
    register,
    watch,
    formState: {errors, isValid},
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      phone: '',
      comment: '',
      agree: false,
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log('Form submitted:', data);
  };

  const isFormReady = watch('agree') && isValid;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='bg-white p-6'>
      <div className='flex flex-col items-start gap-7'>
        <div className='flex md:flex-row flex-col gap-6 items-start w-full'>
          <TextInput
            label={t('form.name.label')}
            size='lg'
            placeholder={t('form.name.placeholder')}
            className='md:flex-1 w-full'
            {...register('name', {
              required: t('form.name.required'),
              minLength: {value: 2, message: t('form.name.short')},
            })}
            styles={{
              label: {fontSize: '16px', color: '#484D52', marginBottom: '6px'},
            }}
            error={errors.name?.message}
          />

          <Controller
            name='phone'
            control={control}
            rules={{
              required: t('form.phone.required'),
              validate: value =>
                value.length >= 10 ? true : t('form.phone.incorrect'),
            }}
            render={({field}) => (
              <div className='flex flex-col md:flex-1 w-full relative'>
                <label className='mb-[6px] text-[#484D52] text-[16px]'>
                  {t('form.phone.label')}
                </label>
                <PhoneInput
                  country='uz'
                  value={field.value}
                  onChange={field.onChange}
                  inputStyle={{
                    width: '100%',
                    height: '50px',
                    fontSize: '16px',
                  }}
                  specialLabel=''
                  inputProps={{
                    name: field.name,
                  }}
                />
                {errors.phone && (
                  <span className='text-red-400 text-[16px] mt-1 absolute -bottom-7'>
                    {errors.phone.message}
                  </span>
                )}
              </div>
            )}
          />
        </div>

        <Textarea
          label={t('form.message.label')}
          minRows={3}
          className='w-full'
          styles={{
            input: {height: '130px'},
            label: {fontSize: '16px', color: '#484D52', marginBottom: '6px'},
          }}
          {...register('comment', {
            required: t('form.message.required'),
            minLength: {
              value: 5,
              message: t('form.message.short'),
            },
          })}
          error={errors.comment?.message}
        />

        <Checkbox
          label={t('form.check.label')}
          {...register('agree', {
            required: t('form.check.required'),
          })}
          styles={{label: {fontSize: '16px', color: '#484D52'}}}
          error={errors.agree?.message}
        />

        <Button
          type='submit'
          size='lg'
          radius={'xl'}
          color='#43A1D0'
          disabled={!isFormReady}
          rightSection={<FaArrowRightLong color='#fff' />}
        >
          {t('form.button')}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
