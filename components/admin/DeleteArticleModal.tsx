'use client'

import styles from './ProductModalWizard.module.css';

export default function DeleteArticleModal({articleId, onClose, onDeleted}: {
    articleId: string;
    onClose: () => void;
    onDeleted: () => void;
}) {
    const handleDelete = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_DATABASE_URL}/api/news/${articleId}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        });

        if (res.ok) {
            onDeleted();
            onClose();
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalCard}>
                <h3>Удалить статью?</h3>
                <p>Это действие необратимо. Подтвердите удаление.</p>
                <div className={styles.modalActions}>
                    <button className="btn" onClick={onClose}>Отмена</button>
                    <button className="btn" onClick={handleDelete}>Удалить</button>
                </div>
            </div>
        </div>
    );
}
