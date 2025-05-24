import React from 'react';
import { useEffect, useState } from 'react';
import ProductModalWizard from '@/components/admin/ProductModalWizard';
import AdminLayout from '@/components/admin/AdminLayout';
import styles from '@/styles/admin-products.module.css';
import EditProductModal from '@/components/admin/EditProductModal';
import DeleteProductModal from '@/components/admin/DeleteProductModal';

interface Product {
  id: string;
  title_ru: string;
  title_uz: string;
  img: string;
  width: string;
  density: string;
  dye: string;
  composition: string;
  category_ids: string[];
  subcategory_ids: string[];
  description_ru: string;
  description_uz: string;
  images: string[];
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    category: '',
    subcategory: '',
    search: '',
    page: 1,
  });

  const [total, setTotal] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/categories?lang=ru')
      .then((res) => res.json())
      .then((res) => setCategories(res.categories || []));
  }, []);

  useEffect(() => {
    const q = new URLSearchParams({
      page: filters.page.toString(),
      category: filters.category,
      subcategory: filters.subcategory,
      search: filters.search,
    });

    fetch(`/api/products?${q}`)
      .then((res) => res.json())
      .then((res) => {
        setProducts(res.products || []);
        setTotal(res.total || 0);
      });
  }, [filters]);

  const handleCategoryChange = (id: string) => {
    const selected = categories.find((c) => c.id === id);
    setFilters({ ...filters, category: id, subcategory: '', page: 1 });
    setSubcategories(selected?.subcategories || []);
  };

  const totalPages = Math.ceil(total / 12);

  return (
    <AdminLayout>
      <div className={styles.page}>
        <div className={styles.header}>
          <h1>📦 Товары</h1>
          <button className={styles.addBtn} onClick={() => setShowAddModal(true)}>
            ➕ Добавить товар
          </button>
        </div>

        <div className={styles.filters}>
          <div className={styles.categoryBlock}>
            <label>Категория:</label>
            <select value={filters.category} onChange={(e) => handleCategoryChange(e.target.value)}>
              <option value="">Все</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className={styles.categoryBlock}>
            <label>Подкатегория:</label>
            <select value={filters.subcategory} onChange={(e) => setFilters({ ...filters, subcategory: e.target.value })}>
              <option value="">{subcategories.length ? 'Все' : 'Нет подкатегорий'}</option>
              {subcategories.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          <input
            className={styles.searchInput}
            placeholder="🔍 Поиск по названию"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />

          <button className={styles.resetBtn} onClick={() => setFilters({ category: '', subcategory: '', search: '', page: 1 })}>
            🔄 Сбросить
          </button>
        </div>

        <div className={styles.count}>Найдено: {total} товаров</div>

        <div className={styles.grid}>
          {products.map((p) => (
            <div key={p.id} className={styles.card}>
              <img src={p.img} alt={p.title_ru} />
              <div className={styles.info}>
                <strong>{p.title_ru}</strong>
                <p>{p.width} / {p.density}</p>
                <p>{p.composition}</p>
                <div className={styles.actions}>
                  <button onClick={() => setEditProduct(p)}>✏️</button>
                  <button onClick={() => setDeleteProductId(p.id)}>🗑️</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.pagination}>
          <button disabled={filters.page === 1} onClick={() => setFilters({ ...filters, page: filters.page - 1 })}>
            ←
          </button>
          <span>{filters.page} / {totalPages}</span>
          <button disabled={filters.page === totalPages} onClick={() => setFilters({ ...filters, page: filters.page + 1 })}>
            →
          </button>
        </div>

        {showAddModal && (
          <ProductModalWizard
            onClose={() => {
              setShowAddModal(false);
              setFilters({ ...filters });
            }}
          />
        )}

        {editProduct && (
          <EditProductModal
            product={editProduct}
            onClose={() => {
              setEditProduct(null);
              setFilters({ ...filters });
            }}
          />
        )}

        {deleteProductId && (
          <DeleteProductModal
            productId={deleteProductId}
            onClose={() => setDeleteProductId(null)}
            onDeleted={() => setFilters({ ...filters })}
          />
        )}
      </div>
    </AdminLayout>
  );
}
