import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import useAdminAuth from '@/hooks/useAdminAuth';
interface Option {
  id: number;
  value: string;
  label_ru: string;
  label_uz: string;
  count: number;
}

interface Filter {
  id: string;
  label: {
    ru: string;
    uz: string;
  };
}

export default function AdminCategoriesPage() {
  useAdminAuth();
  const [filters] = useState<Filter[]>([
    { id: 'category', label: { ru: 'Категория', uz: 'Kategoriya' } },
    { id: 'width', label: { ru: 'Ширина', uz: 'Kenglik' } },
    { id: 'density', label: { ru: 'Плотность', uz: 'Zichlik' } },
    { id: 'dyeing', label: { ru: 'Вид крашения', uz: 'Boʻyoqlash turi' } },
    { id: 'composition', label: { ru: 'Состав', uz: 'Tarkibi' } },
  ]);
  const [options, setOptions] = useState<Option[]>([]);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('category');
  const [search, setSearch] = useState('');
  const [multiRu, setMultiRu] = useState('');
  const [multiUz, setMultiUz] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/filters/${selectedFilter}`)
      .then(res => res.json())
      .then(data => {
        const sorted = [...data].reverse();
        setOptions(sorted);
        setFilteredOptions(sorted);
      });
  }, [selectedFilter]);

  useEffect(() => {
    const keyword = search.toLowerCase();
    setFilteredOptions(
      options.filter(opt =>
        opt.label_ru.toLowerCase().includes(keyword) ||
        opt.label_uz.toLowerCase().includes(keyword)
      )
    );
  }, [search, options]);

  const handleBatchAdd = async () => {
    if (!multiRu.trim() || !multiUz.trim()) {
      setError(true);
      return;
    }

    setError(false);

    const ru = multiRu.trim();
    const uz = multiUz.trim();
    const value = ru.toLowerCase().replace(/\s+/g, '_');

    await fetch('/api/filters', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filter_id: selectedFilter,
        value,
        label_ru: ru,
        label_uz: uz
      })
    });

    setMultiRu('');
    setMultiUz('');
    const res = await fetch(`/api/filters/${selectedFilter}`);
    const data = await res.json();
    const sorted = [...data].reverse();
    setOptions(sorted);
    setFilteredOptions(sorted);
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/filters/${id}`, { method: 'DELETE' });
    const res = await fetch(`/api/filters/${selectedFilter}`);
    const data = await res.json();
    const sorted = [...data].reverse();
    setOptions(sorted);
    setFilteredOptions(sorted);
  };

  return (
    <AdminLayout>
      <div className="filters-page">
        <div className="filters-header">
          <h1>Фильтры и Подкатегории</h1>
          <div className="filters-controls">
            <select value={selectedFilter} onChange={e => setSelectedFilter(e.target.value)}>
              {filters.map(f => (
                <option key={f.id} value={f.id}>{f.label.ru} / {f.label.uz}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Поиск подкатегории"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="filters-add" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '16px', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '4px' }}>Русский:</label>
            <input
              type="text"
              style={{
                padding: '8px',
                borderRadius: '6px',
                background: '#2b2b2b',
                color: '#fff',
                border: error && !multiRu.trim() ? '1px solid red' : '1px solid #555',
                width: '100%'
              }}
              placeholder="Хлопок"
              value={multiRu}
              onChange={e => setMultiRu(e.target.value.replace(/,/g, ''))}
            />
            {error && !multiRu.trim() && <p style={{ color: 'red', fontSize: '12px' }}>Введите хотя бы одно значение</p>}
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '4px' }}>O‘zbekcha:</label>
            <input
              type="text"
              style={{
                padding: '8px',
                borderRadius: '6px',
                background: '#2b2b2b',
                color: '#fff',
                border: error && !multiUz.trim() ? '1px solid red' : '1px solid #555',
                width: '100%'
              }}
              placeholder="Paxta"
              value={multiUz}
              onChange={e => setMultiUz(e.target.value.replace(/,/g, ''))}
            />
            {error && !multiUz.trim() && <p style={{ color: 'red', fontSize: '12px' }}>Kamida bitta qiymat kiriting</p>}
          </div>
          <button onClick={handleBatchAdd} style={{ height: '40px' }}>➕ Добавить</button>
        </div>
        <ul className="filters-list">
          {filteredOptions.map(o => (
            <li key={o.id} className="filters-item">
              <span>{o.label_ru} / {o.label_uz}</span>
              <div className="filters-actions">
                <button onClick={() => handleDelete(o.id)}>🗑</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AdminLayout>
  );
}
