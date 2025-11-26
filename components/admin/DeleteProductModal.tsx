'use client'

import styles from './ProductModalWizard.module.css';

export default function DeleteProductModal({ articleId, onClose, onDeleted }: {
  articleId: string;
  onClose: () => void;
  onDeleted: () => void;
}) {
  const handleDelete = async () => {
    const res = await fetch(`/api/products/${articleId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      onDeleted();
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalCard}>
        <h3>Удалить товар?</h3>
        <p>Это действие необратимо. Подтвердите удаление.</p>
        <div className={styles.modalActions}>
          <button className="btn" onClick={onClose}>Отмена</button>
          <button className="btn" onClick={handleDelete}>Удалить</button>
        </div>
      </div>
    </div>
  );
}
