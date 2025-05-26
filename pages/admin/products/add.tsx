import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import Cookies from 'js-cookie';
import AdminLayout from '@/components/admin/AdminLayout';

interface Option {
  id: number;
  value: string;
  label_ru: string;
  label_uz: string;
}

export default function AddProduct() {
  const router = useRouter();
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
    const fetchFilters = async () => {
      const filterTypes = [
        'category',
        'width',
        'density',
        'dyeing',
        'composition',
      ];
      const fetched: Record<string, Option[]> = {};
      await Promise.all(
        filterTypes.map(async type => {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_DATABASE_URL}/api/filters/${type}`
          );
          const data = await res.json();
          fetched[type] = data;
        })
      );
      setFilters(fetched);
    };
    fetchFilters();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = Cookies.get('admin_token');

    const res = await fetch('/api/products', {
      method: 'POST',
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
        images,
      }),
    });

    if (res.ok) {
      router.push('/admin/products');
    }
  };

  const toggleWidthId = (id: number) => {
    setWidthIds(prev =>
      prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id]
    );
  };

  return (
    <AdminLayout>
      <div className='add-product-form dark'>
        <h1>Добавить товар</h1>
        <form onSubmit={handleSubmit} className='form'>
          <input
            placeholder='Название'
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder='Описание'
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input
            placeholder='Цена'
            type='number'
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
          <input
            placeholder='Обложка'
            value={img}
            onChange={e => setImg(e.target.value)}
          />

          {/* Категория */}
          <select
            value={categoryId ?? ''}
            onChange={e => setCategoryId(Number(e.target.value))}
            required
          >
            <option value=''>Выберите категорию</option>
            {filters.category?.map(opt => (
              <option key={opt.id} value={opt.id}>
                {opt.label_ru}
              </option>
            ))}
          </select>

          {/* Ширина (мульти) */}
          <fieldset>
            <legend>Ширина (можно несколько)</legend>
            {filters.width?.map(opt => (
              <label key={opt.id} style={{display: 'block'}}>
                <input
                  type='checkbox'
                  checked={widthIds.includes(opt.id)}
                  onChange={() => toggleWidthId(opt.id)}
                />{' '}
                {opt.label_ru}
              </label>
            ))}
          </fieldset>

          {/* Остальные одиночные фильтры */}
          <select
            value={densityId ?? ''}
            onChange={e => setDensityId(Number(e.target.value))}
          >
            <option value=''>Плотность</option>
            {filters.density?.map(opt => (
              <option key={opt.id} value={opt.id}>
                {opt.label_ru}
              </option>
            ))}
          </select>

          <select
            value={dyeingId ?? ''}
            onChange={e => setDyeingId(Number(e.target.value))}
          >
            <option value=''>Крашение</option>
            {filters.dyeing?.map(opt => (
              <option key={opt.id} value={opt.id}>
                {opt.label_ru}
              </option>
            ))}
          </select>

          <select
            value={compositionId ?? ''}
            onChange={e => setCompositionId(Number(e.target.value))}
          >
            <option value=''>Состав</option>
            {filters.composition?.map(opt => (
              <option key={opt.id} value={opt.id}>
                {opt.label_ru}
              </option>
            ))}
          </select>

          <button type='submit'>➕ Добавить</button>
        </form>
      </div>
    </AdminLayout>
  );
}
