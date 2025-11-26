'use client'

import {useState} from 'react';
import Image from 'next/image';
import styles from './ProductModalWizard.module.css';
import Editor from "@/components/admin/Editor";
import {Loader} from "@mantine/core";

interface ArticleData {
    short_ru: string;
    short_uz: string;
    short_en?: string;
    body_ru: string;
    body_en?: string;
    body_uz: string;
    slug_ru?: string;
    slug_uz?: string;
    type: 'article' | 'blog' | string;
    img: string;
}

export default function AddArticleModal({onClose}: { onClose: () => void }) {
    const [data, setData] = useState<ArticleData>({
        short_ru: '',
        short_uz: '',
        body_ru: '',
        body_uz: '',
        type: 'article',
        img: ''
    });
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [section, setSection] = useState<'uz' | 'ru'>('ru')
    const articleTypes = [{name: 'Статья', type: 'article'}, {name: 'Блог', type: 'blog'}]
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({
        short_ru: false,
        short_uz: false,
        body_ru: false,
        body_uz: false,
        type: false,
        img: false,
    });

    const handleUpload = async (file: File) => {
        const form = new FormData();
        form.append('file', file);
        const res = await fetch('/api/upload/image', {
            method: 'POST',
            body: form,
            credentials: 'include'
        });

        const result = await res.json();
        return `${process.env.NEXT_PUBLIC_DATABASE_URL}${result.url}`;
    };

    const validateFields = () => {
        errors.short_ru = data.short_ru === ''
        errors.short_uz = data.short_uz === ''
        errors.body_ru = data.body_ru === ''
        errors.body_uz = data.body_uz === ''
        errors.img = data.img === ''

        setErrors({
            short_ru: data.short_ru === '',
            short_uz: data.short_uz === '',
            body_ru: data.body_ru === '',
            body_uz: data.body_uz === '',
            img: data.img === '',
        })

        return !Object.values(errors).some(el => el)
    }

    const handleSave = async () => {
        if (!validateFields()) {
            return
        }

        setIsLoading(true)

        const res = await fetch(`${process.env.NEXT_PUBLIC_DATABASE_URL}/api/news`, {
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
        if (section === 'ru') {
            return (
                <div className={styles.section}>
                    <div className={styles.fieldGroup}>
                        <label>
                            Заголовок RU <span style={{color: 'red'}}>*</span>
                        </label>
                        <input
                            className={`${styles.input} ${
                                errors.short_ru ? styles.error : ''
                            }`}
                            value={data.short_ru}
                            onChange={e => setData({...data, short_ru: e.target.value})}
                        />
                        {errors.short_ru && (
                            <p className={styles.errorText}>Это обязательное поле</p>
                        )}
                    </div>

                    <div className={styles.fieldGroup}>
                        <label>
                            Текст RU <span style={{color: 'red'}}>*</span>
                        </label>

                        {section === 'ru' && <Editor
                            onUpdateAction={(v) => setData({...data, body_ru: v})}
                            key="editor_ru"
                            value={data.body_ru}
                        />}

                        {errors.body_ru && (
                            <p className={styles.errorText}>Это обязательное поле</p>
                        )}
                    </div>
                </div>
            )
        }

        return (
            <div className={styles.section}>
                <div className={styles.fieldGroup}>
                    <label>
                        Заголовок UZ <span style={{color: 'red'}}>*</span>
                    </label>
                    <input
                        className={`${styles.input} ${
                            errors.short_uz ? styles.error : ''
                        }`}
                        value={data.short_uz}
                        onChange={e => setData({...data, short_uz: e.target.value})}
                    />
                    {errors.short_uz && (
                        <p className={styles.errorText}>Это обязательное поле</p>
                    )}
                </div>

                <div className={styles.fieldGroup}>
                    <label>
                        Текст UZ <span style={{color: 'red'}}>*</span>
                    </label>

                    {section === 'uz' && <Editor
                        onUpdateAction={(v) => setData({...data, body_uz: v})}
                        key="editor_uz"
                        value={data.body_uz}
                    />}

                    {errors.body_uz && (
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
                    <div className={styles.section}>
                        <div className={styles.fieldGroup}>
                            <label>Изображение</label>
                            {!data.img ? (
                                <input
                                    className={styles.input}
                                    type='file'
                                    accept='image/*'
                                    onChange={async e => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            const url = await handleUpload(file);
                                            setData({...data, img: url});
                                        }
                                    }}
                                />
                            ) : (
                                <div className={styles.thumb}>
                                    <Image src={data.img} alt='cover' width={120} height={120}/>
                                    <button onClick={() => setData({...data, img: ''})}>×</button>
                                </div>
                            )}

                            {errors.img && (
                                <p className={styles.errorText}>Изображение обязательно</p>
                            )}
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>Тип</label>
                            <select className={styles.input} defaultValue={'article'}
                                    onChange={(e) => setData({...data, type: e.target.value})}>
                                {
                                    articleTypes.map(e => (
                                        <option key={e.type} value={e.type}>{e.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
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
