'use client'

// pages/admin/products.tsx
import React, {useEffect, useState} from 'react';
import useAdminAuth from '@/hooks/useAdminAuth';
import AdminLayout from '@/components/admin/AdminLayout';
import styles from '@/styles/admin-products.module.css';
import EditProductModal from '@/components/admin/EditProductModal';
import DeleteProductModal from '@/components/admin/DeleteProductModal';
import AddVacancyModal from "@/components/admin/AddVacancyModal";
import {GetServerSideProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import i18nConfig from "@/next-i18next.config";

export default function AdminVacanciesPage() {
    useAdminAuth();
    const [vacancies, setVacancies] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editVacancy, setEditVacancy] = useState<any | null>(null);
    const [deleteVacancyId, setDeleteVacancyId] = useState<string | null>(null);
    const [refreshTrigger, setRefreshTrigger] = useState(false);

    useEffect(() => {
        const q = new URLSearchParams();
        q.set('page', String(page))

        fetch(`/api/vacancies?${q.toString()}`)
            .then((res) => res.json())
            .then((res) => {
                setVacancies(res.vacancies || []);
                setTotal(res.total || 1);
            });
    }, [page, refreshTrigger]);

    const totalPages = Math.ceil(total / 12);

    return (
        <AdminLayout>
            <div className={styles.page}>
                <div className={styles.header}>
                    <h1>📦 Вакансии</h1>
                    <button className={styles.addBtn} onClick={() => setShowAddModal(true)}>➕ Добавить вакансию</button>
                </div>

                <div className={styles.count}>{total} вакансий</div>

                {vacancies.length === 0 && (
                    <div className={styles.emptyMessage}>
                        ❗ Нет вакансий
                    </div>
                )}

                <div className={styles.grid}>
                    {vacancies.map((p) => (
                        <div key={p.id} className={styles.card}>
                            {p.img ? (
                                <img src={p.img} alt={p.title_ru}/>
                            ) : (
                                <div style={{height: 130, background: '#222'}}/>
                            )}
                            <div className={styles.info}>
                                <strong>{p.title_ru}</strong>
                                <p>{p.width_ids?.join(', ')}</p>
                                <p>{p.density_ids?.join(', ')}</p>
                                <div className={styles.actions}>
                                    <button onClick={() => setEditVacancy(p)}>✏️</button>
                                    <button onClick={() => setDeleteVacancyId(p.id)}>🗑️</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.pagination}>
                    <button disabled={page === 1} onClick={() => setPage(page - 1)}>←</button>
                    <span>{page} / {totalPages}</span>
                    <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>→</button>
                </div>

                {showAddModal && <AddVacancyModal onClose={() => {
                    setShowAddModal(false);
                    setRefreshTrigger(prev => !prev);
                }}/>}
                {editVacancy && <EditProductModal product={editVacancy} onClose={() => setEditVacancy(null)}/>}
                {deleteVacancyId &&
                    <DeleteProductModal articleId={deleteVacancyId} onClose={() => setDeleteVacancyId(null)}
                                        onDeleted={() => setRefreshTrigger(prev => !prev)}/>}
            </div>
        </AdminLayout>
    );
}

export const getServerSideProps: GetServerSideProps = async ({locale}) => {
    return {
        props: {
            ...(await serverSideTranslations(
                locale ?? 'ru',
                ['common', 'main'],
                i18nConfig
            )),
        },
    };
};
