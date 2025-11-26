'use client'

import React, {useEffect, useState} from 'react';
import useAdminAuth from '@/hooks/useAdminAuth';
import AdminLayout from '@/components/admin/AdminLayout';
import styles from '@/styles/admin-products.module.css';
import {useRouter} from 'next/router';
import AddArticleModal from "@/components/admin/AddArticleModal";
import EditArticleModal from "@/components/admin/EditArticleModal";
import DeleteArticleModal from "@/components/admin/DeleteArticleModal";


export default function AdminProductsPage() {
    useAdminAuth();
    const [articles, setArticles] = useState<any[]>([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const {locale} = useRouter();
    const [showAddModal, setShowAddModal] = useState(false);
    const [editArticle, setEditArticle] = useState<any | null>(null);
    const [deleteArticleId, setDeleteArticleId] = useState<string | null>(null);
    const [refreshTrigger, setRefreshTrigger] = useState(false);

    useEffect(() => {
        const q = new URLSearchParams();
        q.set('page', String(page));
        if (search) q.set('search', search);

        fetch(`/api/news?${q.toString()}`)
            .then((res) => res.json())
            .then((res) => {
                setArticles(res.articles || []);
                setTotal(res.total || 0);
            });
    }, [search, page, refreshTrigger]);

    const totalPages = Math.ceil(total / 12);

    return (
        <AdminLayout>
            <div className={styles.page}>
                <div className={styles.header}>
                    <h1>📦 Статьи</h1>
                    <button className={styles.addBtn} onClick={() => setShowAddModal(true)}>➕ Добавить статью</button>
                </div>
                <div className={styles.count}>Найдено: {total} статьей</div>

                {articles.length === 0 && (
                    <div className={styles.emptyMessage}>
                        ❗ Нет статьи по выбранным фильтрам
                    </div>
                )}

                <div className={styles.grid}>
                    {articles.map((article) => (
                        <div key={article.id} className={styles.card}>
                            {article.img ? (
                                <img src={article.img} alt={article.short_ru}/>
                            ) : (
                                <div style={{height: 130, background: '#222'}}/>
                            )}
                            <div className={styles.info}>
                                <strong>{locale === 'ru' ? article.short_ru : article.short_ru}</strong>
                                <div className={styles.actions}>
                                    <button onClick={() => setEditArticle(article)}>✏️</button>
                                    <button onClick={() => setDeleteArticleId(article.id)}>🗑️</button>
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

                {showAddModal && <AddArticleModal onClose={() => {
                    setShowAddModal(false);
                    setRefreshTrigger(prev => !prev);
                }}/>}
                {editArticle && <EditArticleModal article={editArticle} onClose={() => {
                    setEditArticle(null)
                    setRefreshTrigger(prev => !prev)
                }}/>}
                {deleteArticleId &&
                    <DeleteArticleModal articleId={deleteArticleId} onClose={() => setDeleteArticleId(null)}
                                        onDeleted={() => setRefreshTrigger(prev => !prev)}/>}
            </div>
        </AdminLayout>
    );
}
