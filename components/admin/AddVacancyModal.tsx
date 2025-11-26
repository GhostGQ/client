'use client'

import {useState} from 'react';
import styles from './ProductModalWizard.module.css';
import Editor from "@/components/admin/Editor";
import {Loader} from "@mantine/core";
import MultiSelect from "@/components/MultiSelect";
import specializations from "@/constants/specializations";
import experiences from "@/constants/experiences";
import {useTranslation} from "react-i18next";
import work_conditions from "@/constants/work_conditions";
import work_format from "@/constants/work_format";
import work_schedule_formats from "@/constants/work_schedule_formats";
import working_hours from "@/constants/working_hours";
import payment_currencies from "@/constants/payment_currencies";
import payment_terms from "@/constants/payment_terms";
import languages from "@/constants/languages";
import driver_licences from "@/constants/driver_licences";

interface VacancyData {
    title_ru: string;
    title_uz: string;
    specialization: string[];
    experience: string;
    work_conditions: string;
    work_format: string;
    working_schedule: string;
    working_hours_per_day: string;
    night_shifts: boolean;
    working_address: string;
    city_of_publication: string;
    payment_amount_from: number;
    payment_amount_to: number;
    payment_currency: string;
    payment_term: string;
    description_ru: string;
    description_uz: string;
    skills: string[];
    languages: string[];
    driver_licenses: string[];
}

export default function AddVacancyModal({onClose}: { onClose: () => void }) {
    const [data, setData] = useState<VacancyData>({
        title_ru: '',
        title_uz: '',
        specialization: [],
        experience: '',
        work_conditions: '',
        work_format: '',
        working_schedule: '',
        working_hours_per_day: '',
        night_shifts: false,
        working_address: '',
        city_of_publication: '',
        payment_amount_from: 0,
        payment_amount_to: 0,
        payment_currency: '',
        payment_term: '',
        description_ru: '',
        description_uz: '',
        skills: [],
        languages: [],
        driver_licenses: [],
    });
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [section, setSection] = useState<'uz' | 'ru'>('ru')
    const {t} = useTranslation('common')
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({
        title_ru: false,
        title_uz: false,
        specialization: false,
        experience: false,
        work_conditions: false,
        work_format: false,
        working_schedule: false,
        working_hours_per_day: false,
        night_shifts: false,
        working_address: false,
        city_of_publication: false,
        payment_amount_from: false,
        payment_amount_to: false,
        payment_currency: false,
        payment_term: false,
        description_ru: false,
        description_uz: false,
        skills: false,
        languages: false,
        driver_licenses: false
    });


    const validateFields = () => {
        errors.title_ru = data.title_ru === ''
        errors.title_uz = data.title_uz === ''
        errors.specialization = data.specialization.length === 0
        errors.experience = data.experience === ''
        errors.work_conditions = data.work_conditions === ''
        errors.work_format = data.work_format === ''
        errors.working_schedule = data.working_schedule === ''
        errors.working_hours_per_day = data.working_hours_per_day === ''
        errors.working_address = data.working_address === ''
        errors.city_of_publication = data.city_of_publication === ''
        errors.payment_amount_from = data.payment_amount_from === 0
        errors.payment_amount_to = data.payment_amount_to === 0
        errors.payment_currency = data.payment_currency === ''
        errors.payment_term = data.payment_term === ''
        errors.description_ru = data.description_ru === ''
        errors.skills = data.skills.length === 0
        errors.languages = data.languages.length === 0
        errors.driver_licenses = data.driver_licenses.length === 0

        setErrors({
            title_ru: data.title_ru === '',
            title_uz: data.title_uz === '',
            specialization: data.specialization.length === 0,
            experience: data.experience === '',
            work_conditions: data.work_conditions === '',
            work_format: data.work_format === '',
            working_schedule: data.working_schedule === '',
            working_hours_per_day: data.working_hours_per_day === '',
            working_address: data.working_address === '',
            city_of_publication: data.city_of_publication === '',
            payment_amount_from: data.payment_amount_from === 0,
            payment_amount_to: data.payment_amount_to === 0,
            payment_currency: data.payment_currency === '',
            payment_term: data.payment_term === '',
            description_ru: data.description_ru === '',
            description_uz: data.description_uz === '',
            skills: data.skills.length === 0,
            languages: data.languages.length === 0,
            driver_licenses: data.driver_licenses.length === 0
        })

        console.log(errors)

        return !Object.values(errors).some(el => el)
    }

    const handleSave = async () => {
        if (!validateFields()) {
            return
        }

        setIsLoading(true)

        const res = await fetch(`${process.env.NEXT_PUBLIC_DATABASE_URL}/api/vacancies`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
            credentials: 'include'
        });

        if (res.ok) {
            onClose()
            setIsLoading(false)
        } else {
            setIsLoading(false)
            alert((await res.json())?.message ?? '')
        }
    }

    const renderSections = () => {
        return (
            <div className={styles.section}>
                <div className={styles.fieldGroup}>
                    <label>
                        {section === 'ru' && <span>Название RU <span style={{color: 'red'}}>*</span></span>}
                        {section === 'uz' && <span>Название UZ <span style={{color: 'red'}}>*</span></span>}
                    </label>
                    <input
                        className={`${styles.input} ${
                            errors.title_ru || errors.title_uz ? styles.error : ''
                        }`}
                        value={section === 'ru' ? data.title_ru : data.title_uz}
                        onChange={e => {
                            if (section === 'ru') {
                                setData({...data, title_ru: e.target.value})
                            } else {
                                setData({...data, title_uz: e.target.value})
                            }
                        }}
                    />
                    {errors.title_ru || errors.title_uz && (
                        <p className={styles.errorText}>Это обязательное поле</p>
                    )}
                </div>

                <div className={styles.fieldGroup}>
                    <label>
                        <span>Специализация <span style={{color: 'red'}}>*</span></span>
                    </label>
                    <MultiSelect
                        options={specializations}
                        selectedValues={data.specialization}
                        translatablePrefix="specializations"
                        onChange={(selected: string[]): void => {
                            setData({...data, specialization: selected})
                        }}

                        isSearchable={true}
                    />

                    {errors.specialization && (
                        <p className={styles.errorText}>Это обязательное поле</p>
                    )}
                </div>

                <div className={styles.fieldGroup}>
                    <label>
                        <span>Опыт работы <span style={{color: 'red'}}>*</span></span>
                    </label>
                    <select
                        name="experience"
                        id="experience"
                        value={data.experience}
                        className='border border-[#444444] bg-[#2a2a2a] px-2 py-2.5 ring-0 focus:ring-0 outline-none rounded-md'
                        onChange={(e) => setData({...data, experience: e.target.value})}
                    >
                        <option value=""></option>
                        {experiences.map(e => (
                            <option key={e} value={e}>{t(`experiences.${e}`)}</option>
                        ))}
                    </select>

                    {errors.experience && (
                        <p className={styles.errorText}>Это обязательное поле</p>
                    )}
                </div>

                <div className={styles.fieldGroup}>
                    <label>
                        <span>Условия работы <span style={{color: 'red'}}>*</span></span>
                    </label>
                    <select
                        name="work_conditions"
                        id="work_conditions"
                        value={data.work_conditions}
                        className='border border-[#444444] bg-[#2a2a2a] px-2 py-2.5 ring-0 focus:ring-0 outline-none rounded-md'
                        onChange={(e) => setData({...data, work_conditions: e.target.value})}
                    >
                        <option value=""></option>
                        {work_conditions.map(e => (
                            <option key={e} value={e}>{t(`work_conditions.${e}`)}</option>
                        ))}
                    </select>

                    {errors.work_conditions && (
                        <p className={styles.errorText}>Это обязательное поле</p>
                    )}
                </div>

                <div className={styles.fieldGroup}>
                    <label>
                        <span>Формат работы <span style={{color: 'red'}}>*</span></span>
                    </label>
                    <select
                        name="work_format"
                        id="work_format"
                        value={data.work_format}
                        className='border border-[#444444] bg-[#2a2a2a] px-2 py-2.5 ring-0 focus:ring-0 outline-none rounded-md'
                        onChange={(e) => setData({...data, work_format: e.target.value})}
                    >
                        <option value=""></option>
                        {work_format.map(e => (
                            <option key={e} value={e}>{t(`work_formats.${e}`)}</option>
                        ))}
                    </select>

                    {errors.work_format && (
                        <p className={styles.errorText}>Это обязательное поле</p>
                    )}
                </div>

                <div className={styles.fieldGroup}>
                    <label>
                        <span>График работы <span style={{color: 'red'}}>*</span></span>
                    </label>
                    <select
                        name="working_schedule"
                        id="working_schedule"
                        value={data.working_schedule}
                        className='border border-[#444444] bg-[#2a2a2a] px-2 py-2.5 ring-0 focus:ring-0 outline-none rounded-md'
                        onChange={(e) => setData({...data, working_schedule: e.target.value})}
                    >
                        <option value=""></option>
                        {work_schedule_formats.map(e => (
                            <option key={e} value={e}>{t(`work_schedule_formats.${e}`)}</option>
                        ))}
                    </select>

                    {errors.working_schedule && (
                        <p className={styles.errorText}>Это обязательное поле</p>
                    )}
                </div>

                <div className={styles.fieldGroup}>
                    <label>
                        <span>Рабочие часы <span style={{color: 'red'}}>*</span></span>
                    </label>
                    <select
                        name="working_hours_per_day"
                        id="working_hours_per_day"
                        value={data.working_hours_per_day}
                        className='border border-[#444444] bg-[#2a2a2a] px-2 py-2.5 ring-0 focus:ring-0 outline-none rounded-md'
                        onChange={(e) => setData({...data, working_hours_per_day: e.target.value})}
                    >
                        <option value=""></option>
                        {working_hours.map(e => (
                            <option key={e} value={e}>{e}</option>
                        ))}
                    </select>

                    <div className="flex justify-end items-center gap-x-2 mt-1.5">
                        <label htmlFor="night_shifts">Ночные смены</label>
                        <input
                            type="checkbox"
                            name="night_shifts"
                            id="night_shifts"
                            checked={data.night_shifts}
                            onChange={(e) => setData({...data, night_shifts: e.target.checked})}
                        />
                    </div>


                    {errors.working_hours_per_day && (
                        <p className={styles.errorText}>Это обязательное поле</p>
                    )}
                </div>

                <div className={styles.fieldGroup}>
                    <label htmlFor="working_address">
                        <span>Рабочий адрес <span style={{color: 'red'}}>*</span></span>
                    </label>
                    <input
                        name="working_address"
                        id="working_address"
                        value={data.working_address}
                        className='border border-[#444444] bg-[#2a2a2a] px-2 py-2.5 ring-0 focus:ring-0 outline-none rounded-md'
                        onChange={(e) => setData({...data, working_address: e.target.value})}
                    />

                    {errors.working_address && (
                        <p className={styles.errorText}>Это обязательное поле</p>
                    )}
                </div>

                <div className={styles.fieldGroup}>
                    <label htmlFor="city_of_publication">
                        <span>Город публикации <span style={{color: 'red'}}>*</span></span>
                    </label>
                    <input
                        name="city_of_publication"
                        value={data.city_of_publication}
                        id="city_of_publication"
                        className='border border-[#444444] bg-[#2a2a2a] px-2 py-2.5 ring-0 focus:ring-0 outline-none rounded-md'
                        onChange={(e) => setData({...data, city_of_publication: e.target.value})}
                    />

                    {errors.city_of_publication && (
                        <p className={styles.errorText}>Это обязательное поле</p>
                    )}
                </div>

                <div className={styles.fieldGroup}>
                    <label>
                        <span>Зарплата <span style={{color: 'red'}}>*</span></span>
                    </label>

                    <div className="flex items-center">
                        <input
                            name="salary_from"
                            value={data.payment_amount_from}
                            className='border border-[#444444] flex-1 bg-[#2a2a2a] h-[47px] px-2 ring-0 focus:ring-0 outline-none rounded-tl-md rounded-bl-md'
                            onChange={(e) => setData({
                                ...data,
                                payment_amount_from: Number(e.target.value.replace(/(?!^\d*\.?\d*$)[^\d.]/g, ''))
                            })}
                        />
                        <input
                            name="salary_to"
                            value={data.payment_amount_to}
                            className='border border-[#444444] flex-1 bg-[#2a2a2a] h-[47px] px-2 ring-0 focus:ring-0 outline-none'
                            onChange={(e) => setData({
                                ...data,
                                payment_amount_to: Number(e.target.value.replace(/(?!^\d*\.?\d*$)[^\d.]/g, ''))
                            })}
                        />

                        <select
                            name="payment_currency"
                            id="payment_currency"
                            value={data.payment_currency}
                            className='border border-[#444444] bg-[#2a2a2a] h-[47px] px-2 ring-0 focus:ring-0 outline-none'
                            onChange={(e) => setData({...data, payment_currency: e.target.value})}
                        >
                            <option value="">Валюта</option>
                            {payment_currencies.map(e => (
                                <option key={e} value={e}>{e}</option>
                            ))}
                        </select>

                        <select
                            name="payment_term"
                            id="payment_term"
                            value={data.payment_term}
                            className='border border-[#444444] bg-[#2a2a2a] h-[47px] px-2 ring-0 focus:ring-0 outline-none rounded-tr-md rounded-br-md'
                            onChange={(e) => setData({...data, payment_term: e.target.value})}
                        >
                            <option value="">Условия</option>
                            {payment_terms.map(e => (
                                <option key={e} value={e}>{t(`payment_terms.${e}`)}</option>
                            ))}
                        </select>
                    </div>

                    {
                        (
                            errors.payment_amount_from ||
                            errors.payment_amount_to ||
                            errors.payment_currency ||
                            errors.payment_term
                        ) &&
                        (
                            <p className={styles.errorText}>Это обязательное поле</p>
                        )
                    }
                </div>

                <div className={styles.fieldGroup}>
                    <label>
                        <span>Навыки <span style={{color: 'red'}}>*</span></span>
                    </label>
                    <MultiSelect
                        options={specializations}
                        selectedValues={data.skills}
                        onChange={(selected: string[]): void => {
                            setData({...data, skills: selected})
                        }}
                        isSearchable={true}
                        translatablePrefix={'specializations'}
                    />

                    {errors.skills && (
                        <p className={styles.errorText}>Это обязательное поле</p>
                    )}
                </div>

                <div className={styles.fieldGroup}>
                    <label>
                        <span>Языки <span style={{color: 'red'}}>*</span></span>
                    </label>
                    <MultiSelect
                        options={languages}
                        selectedValues={data.languages}
                        onChange={(selected: string[]): void => {
                            setData({...data, languages: selected})
                        }}
                        isSearchable={true}
                        translatablePrefix='languages'
                    />

                    {errors.languages && (
                        <p className={styles.errorText}>Это обязательное поле</p>
                    )}
                </div>

                <div className={styles.fieldGroup}>
                    <label>
                        <span>Водительское удостоверение <span style={{color: 'red'}}>*</span></span>
                    </label>
                    <MultiSelect
                        options={driver_licences}
                        selectedValues={data.driver_licenses}
                        onChange={(selected: string[]): void => {
                            setData({...data, driver_licenses: selected})
                        }}
                        isSearchable={true}
                        translatablePrefix='driver_licences'
                    />

                    {errors.driver_licenses && (
                        <p className={styles.errorText}>Это обязательное поле</p>
                    )}
                </div>

                <div className={styles.fieldGroup}>
                    <label>
                        {section === 'ru' && <span>Описание RU <span style={{color: 'red'}}>*</span></span>}
                        {section === 'uz' && <span>Описание UZ <span style={{color: 'red'}}>*</span></span>}
                    </label>

                    {section === 'ru' && <Editor
                        onUpdateAction={(v) => setData({...data, description_ru: v})}
                        key="editor_ru"
                        value={data.description_ru}
                    />}

                    {section === 'uz' && <Editor
                        onUpdateAction={(v) => setData({...data, description_uz: v})}
                        key="editor_uz"
                        value={data.description_uz}
                    />}

                    {errors.description_ru || errors.description_uz && (
                        <p className={styles.errorText}>Это обязательное поле</p>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalCard}>
                <div className={styles.tabbarContainer}>
                    <button className={`${styles.tabbarButton} ${section === 'ru' ? styles.active : ''}`}
                            onClick={() => setSection('ru')}>RU
                    </button>
                    <button className={`${styles.tabbarButton} ${section === 'uz' ? styles.active : ''}`}
                            onClick={() => setSection('uz')}>UZ
                    </button>
                </div>

                <div>
                    {renderSections()}
                </div>
                <div className={styles.modalActions}>
                    <button className='btn' onClick={onClose}>
                        Отмена
                    </button>

                    <button className='btn flex items-center gap-x-3' onClick={handleSave} disabled={isLoading}>
                        Сохранить
                        {isLoading && <Loader size={15}/>}
                    </button>
                </div>
            </div>
        </div>
    );
}
