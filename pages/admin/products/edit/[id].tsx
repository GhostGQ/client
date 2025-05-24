import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import AdminLayout from '@/components/AdminLayout';

interface Option {
  id: number;
  value: string;
  label_ru: string;
  label_uz: string;
}

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [img, setImg] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [widthIds, setWidthIds] = useState<number[]>([]);
  const [densityId, setDensityId] = useState<number | null>(null);
  const [dyeingId, setDyeingId] = useState<number | null>(null);
  const [compositionId, setCompositionId] = useState<number | null>(null);

  const [filters, setFilters] = useState<Record<string, Option[]>>({});

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      const p = data.product;
      setTitle(p.title_ru || '');
      setDescription(p.description_ru || '');
      setPrice(p.price || '');
      setImg(p.img || '');
      setImages(p.images || []);
      setCategoryId(p.category_id || null);
      setWidthIds(p.width_ids || []);
      setDensityId(p.density_id || null);
      setDyeingId(p.dyeing_id || null);
      setCompositionId(p.composition_id || null);
    };

    const fetchFilters = async () => {
      const types = ['category', 'width', 'density', 'dyeing', 'composition'];
      const fetched: Record<string, Option[]> = {};
      await Promise.all(
        types.map(async (type) => {
          const res = await fetch(`/api/filters/${type}`);
          const data = await res.json();
          fetched[type] = data;
        })
      );
      setFilters(fetched);
    };

    fetchProduct();
    fetchFilters();
  }, [id]);

  const toggleWidthId = (val: number) => {
    setWidthIds(prev => prev.includes(val) ? prev.filter(id => id !== val) : [...prev, val]);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = Cookies.get('admin_token');

    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title_ru: title,
        title_uz: title,
        description_ru: description,
        description_uz: description,
        category_id: categoryId,
        width_ids: widthIds,
        density_id: densityId,
        dyeing_id: dyeingId,
        composition_id: compositionId,
        img,
        images
      })
    });

    if (res.ok) router.push('/admin/products');
  };

  return (
    <AdminLayout>
      <div className="edit-product-form dark">
        <h1>Редактировать товар</h1>
        <form onSubmit={handleUpdate} className="form">
          <input placeholder="Название" value={title} onChange={e => setTitle(e.target.value)} />
          <textarea placeholder="Описание" value={description} onChange={e => setDescription(e.target.value)} />
          <input placeholder="Цена" type="number" value={price} onChange={e => setPrice(e.target.value)} />
          <input placeholder="Обложка" value={img} onChange={e => setImg(e.target.value)} />

          <select value={categoryId ?? ''} onChange={e => setCategoryId(Number(e.target.value))}>
            <option value="">Выберите категорию</option>
            {filters.category?.map(opt => (
              <option key={opt.id} value={opt.id}>{opt.label_ru}</option>
            ))}
          </select>

          <fieldset>
            <legend>Ширина</legend>
            {filters.width?.map(opt => (
              <label key={opt.id} style={{ display: 'block' }}>
                <input
                  type="checkbox"
                  checked={widthIds.includes(opt.id)}
                  onChange={() => toggleWidthId(opt.id)}
                /> {opt.label_ru}
              </label>
            ))}
          </fieldset>

          <select value={densityId ?? ''} onChange={e => setDensityId(Number(e.target.value))}>
            <option value="">Плотность</option>
            {filters.density?.map(opt => (
              <option key={opt.id} value={opt.id}>{opt.label_ru}</option>
            ))}
          </select>

          <select value={dyeingId ?? ''} onChange={e => setDyeingId(Number(e.target.value))}>
            <option value="">Крашение</option>
            {filters.dyeing?.map(opt => (
              <option key={opt.id} value={opt.id}>{opt.label_ru}</option>
            ))}
          </select>

          <select value={compositionId ?? ''} onChange={e => setCompositionId(Number(e.target.value))}>
            <option value="">Состав</option>
            {filters.composition?.map(opt => (
              <option key={opt.id} value={opt.id}>{opt.label_ru}</option>
            ))}
          </select>

          <button type="submit">💾 Сохранить</button>
        </form>
      </div>
    </AdminLayout>
  );
}
