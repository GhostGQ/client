import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import CategoryModal from '@/components/admin/CategoryModal';
import ConfirmModal from '@/components/admin/ConfirmModal';

interface Subcategory {
  id: string;
  name: string;
  product_count: number;
}

interface Category {
  id: string;
  name: string;
  lang: string;
  subcategories: Subcategory[];
}

interface DualCategory {
  id: string;
  ru: { name: string; subcategories: string[] };
  uz: { name: string; subcategories: string[] };
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filtered, setFiltered] = useState<Category[]>([]);
  const [lang, setLang] = useState<'ru' | 'uz'>('ru');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selected, setSelected] = useState<DualCategory | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchCategories = async () => {
    const res = await fetch(`/api/categories?lang=${lang}`);
    const data = await res.json();
    setCategories(data.categories || []);
  };

  useEffect(() => {
    fetchCategories();
  }, [lang]);

  useEffect(() => {
    setFiltered(
      categories.filter((cat) => cat.name.toLowerCase().includes(search.toLowerCase()))
    );
  }, [categories, search]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await fetch(`/api/categories/${deleteTarget.id}`, { method: 'DELETE' });
    setDeleteTarget(null);
    fetchCategories();
  };

  const openEditModal = async (id: string) => {
    const [ruRes, uzRes] = await Promise.all([
      fetch(`/api/categories/${id}?lang=ru`),
      fetch(`/api/categories/${id}?lang=uz`)
    ]);

    const ruData = await ruRes.json();
    const uzData = await uzRes.json();

    setSelected({
      id,
      ru: {
        name: ruData.category?.name || '',
        subcategories: ruData.category?.subcategories?.map((s: any) => s.name) || []
      },
      uz: {
        name: uzData.category?.name || '',
        subcategories: uzData.category?.subcategories?.map((s: any) => s.name) || []
      }
    });

    setShowModal(true);
  };

  return (
    <AdminLayout>
      <div className="categories-page">
        <div className="categories-header">
          <h1>Категории</h1>
          <div className="filters">
            <select value={lang} onChange={(e) => setLang(e.target.value as 'ru' | 'uz')}>
              <option value="ru">Русский</option>
              <option value="uz">O‘zbekcha</option>
            </select>
            <input
              type="text"
              placeholder="Поиск категории"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={() => { setSelected(null); setShowModal(true); }}>
              ➕ Добавить
            </button>
          </div>
        </div>

        <table className="category-table">
          <thead>
            <tr>
              <th>Категория</th>
              <th>Язык</th>
              <th>Подкатегории</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((cat) => (
              <tr key={cat.id}>
                <td onClick={() => toggleExpand(cat.id)} style={{ cursor: 'pointer' }}>
                  {cat.name}
                </td>
                <td>{cat.lang}</td>
                <td>
                  {expandedId === cat.id ? (
                    <ul>
                      {cat.subcategories.map((sub) => (
                        <li key={sub.id}>
                          {sub.name} ({sub.product_count})
                        </li>
                      ))}
                    </ul>
                  ) : (
                    `${cat.subcategories.length} подкатегорий`
                  )}
                </td>
                <td>
                  <button onClick={() => openEditModal(cat.id)}>✏️</button>
                  <button onClick={() => setDeleteTarget(cat)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showModal && (
          <CategoryModal
            onClose={() => { setShowModal(false); fetchCategories(); }}
            category={selected}
          />
        )}

        {deleteTarget && (
          <ConfirmModal
            title="Удалить категорию?"
            onConfirm={handleDelete}
            onCancel={() => setDeleteTarget(null)}
          />
        )}
      </div>
    </AdminLayout>
  );
}
