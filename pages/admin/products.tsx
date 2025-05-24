// pages/admin/products.tsx
import React, { useEffect, useState } from 'react';
import ProductModalWizard from '@/components/admin/ProductModalWizard';
import AdminLayout from '@/components/admin/AdminLayout';
import styles from '@/styles/admin-products.module.css';
import EditProductModal from '@/components/admin/EditProductModal';
import DeleteProductModal from '@/components/admin/DeleteProductModal';
import { useRouter } from 'next/router';

interface FilterOption {
  id: number;
  label: string;
}

const FILTER_KEYS = ['category', 'width', 'density', 'dyeing', 'composition'];
const FILTER_LABELS_RU: Record<string, string> = {
  category: 'Категория',
  width: 'Ширина',
  density: 'Плотность',
  dyeing: 'Крашение',
  composition: 'Состав',
};

type FilterMap = Record<string, FilterOption[]>;
type SelectedFilters = Record<string, number[]>;
type TempFilters = Record<string, number[]>;

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [filtersData, setFiltersData] = useState<FilterMap>({});
  const [selected, setSelected] = useState<SelectedFilters>({});
  const [tempFilters, setTempFilters] = useState<TempFilters>({});
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const { locale } = useRouter();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editProduct, setEditProduct] = useState<any | null>(null);
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);
  const [openFilters, setOpenFilters] = useState<Record<string, boolean>>({});
  const [allOpen, setAllOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  useEffect(() => {
    const defaultOpen: Record<string, boolean> = {};
    FILTER_KEYS.forEach((key) => {
      defaultOpen[key] = true;
    });
    setOpenFilters(defaultOpen);
  }, [filtersData]);

  useEffect(() => {
    Promise.all(
      FILTER_KEYS.map(async (key) => {
        const res = await fetch(`/api/filters/${key}`);
        const json = await res.json();
        return [
          key,
          json.map((i: any) => ({
            id: i.id,
            label: i[`label_${locale}`] || i.label_ru || i.value
          }))
        ];
      })
    ).then((results) => {
      const map: FilterMap = {};
      results.forEach(([key, data]) => (map[key as string] = data));
      setFiltersData(map);
    });
  }, [locale]);

  useEffect(() => {
    const q = new URLSearchParams();
    q.set('page', String(page));
    if (search) q.set('search', search);
    Object.entries(selected).forEach(([key, ids]) => {
      ids.forEach((id) => q.append(`${key}_ids`, String(id)));
    });
    fetch(`/api/products?${q.toString()}`)
      .then((res) => res.json())
      .then((res) => {
        setProducts(res.products || []);
        setTotal(res.total || 0);
      });
  }, [selected, search, page, refreshTrigger]);

  const toggle = (key: string, id: number) => {
    const set = new Set(tempFilters[key] || []);
    set.has(id) ? set.delete(id) : set.add(id);
    setTempFilters({ ...tempFilters, [key]: Array.from(set) });
  };

  const applyFilters = () => {
    setSelected(tempFilters);
    setPage(1);
  };

  const toggleFilterGroup = (key: string) => {
    setOpenFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleAll = () => {
    const newState: Record<string, boolean> = {};
    FILTER_KEYS.forEach((key) => {
      newState[key] = !allOpen;
    });
    setOpenFilters(newState);
    setAllOpen(!allOpen);
  };

  const renderCheckboxGroup = (key: string) => {
    if (!filtersData[key] || filtersData[key].length === 0) return null;

    return (
      <div className={styles.filterGroup} key={key}>
        <div className={styles.filterGroupHeader} onClick={() => toggleFilterGroup(key)}>
          <span className={styles.filterTitle}>{FILTER_LABELS_RU[key] || key}</span>
          <span className={styles.filterArrow}>{openFilters[key] ? '▲' : '▼'}</span>
        </div>
        {openFilters[key] && (
          <div className={styles.checkboxList}>
            {filtersData[key].map((opt) => (
              <label key={opt.id} className={styles.checkboxItem}>
                <input
                  type="checkbox"
                  checked={tempFilters[key]?.includes(opt.id) || false}
                  onChange={() => toggle(key, opt.id)}
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderSelectedFilters = () => {
    const list: string[] = [];
    Object.entries(selected).forEach(([key, ids]) => {
      const opts = filtersData[key] || [];
      ids.forEach((id) => {
        const label = opts.find((o) => o.id === id)?.label;
        if (label) list.push(label);
      });
    });
    return list.length ? (
      <div className={styles.activeFilters}>
        <strong>Вы выбрали:</strong> {list.join(', ')}
      </div>
    ) : null;
  };

  const totalPages = Math.ceil(total / 12);

  return (
    <AdminLayout>
      <div className={styles.page}>
        <div className={styles.header}>
          <h1>📦 Товары</h1>
          <button className={styles.addBtn} onClick={() => setShowAddModal(true)}>➕ Добавить товар</button>
        </div>

        <div className={styles.filters}>
          {FILTER_KEYS.map((key) => renderCheckboxGroup(key))}
          <input
            className={styles.searchInput}
            placeholder="🔍 Поиск"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className={styles.resetBtn} onClick={() => { setSelected({}); setTempFilters({}); setSearch(''); setPage(1); }}>
            🔄 Сбросить
          </button>
          <button className={styles.resetBtn} onClick={toggleAll}>
            {allOpen ? '⛔ Свернуть всё' : '🔽 Развернуть всё'}
          </button>
          <button className={styles.applyBtn} onClick={applyFilters}>
            ✅ Применить фильтры
          </button>
        </div>

        {renderSelectedFilters()}

        <div className={styles.count}>Найдено: {total} товаров</div>

        {products.length === 0 && (
          <div className={styles.emptyMessage}>
            ❗ Нет товаров по выбранным фильтрам
          </div>
        )}

        <div className={styles.grid}>
          {products.map((p) => (
            <div key={p.id} className={styles.card}>
              {p.img ? (
                <img src={p.img} alt={p.title_ru} />
              ) : (
                <div style={{ height: 130, background: '#222' }} />
              )}
              <div className={styles.info}>
                <strong>{p.title_ru}</strong>
                <p>{p.width_ids?.join(', ')}</p>
                <p>{p.density_ids?.join(', ')}</p>
                <div className={styles.actions}>
                  <button onClick={() => setEditProduct(p)}>✏️</button>
                  <button onClick={() => setDeleteProductId(p.id)}>🗑️</button>
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

        {showAddModal && <ProductModalWizard onClose={() => { setShowAddModal(false); setRefreshTrigger(prev => !prev); }} />}
        {editProduct && <EditProductModal product={editProduct} onClose={() => setEditProduct(null)} />}
        {deleteProductId && <DeleteProductModal productId={deleteProductId} onClose={() => setDeleteProductId(null)} onDeleted={() => setRefreshTrigger(prev => !prev)} />}
      </div>
    </AdminLayout>
  );
}
