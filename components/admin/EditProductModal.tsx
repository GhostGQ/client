import {useEffect, useState} from 'react';
import Image from 'next/image';
import styles from './ProductModalWizard.module.css';

interface FilterOption {
  id: number;
  label: string;
}

interface ProductData {
  id: string;
  title_ru: string;
  title_uz: string;
  description_ru: string;
  description_uz: string;
  category_ids: number[];
  width_ids: number[];
  density_ids: number[];
  dyeing_ids: number[];
  composition_ids: number[];
  img: string;
  images: string[];
}

export default function EditProductModal({
  product,
  onClose,
}: {
  product: any;
  onClose: () => void;
}) {
  const [data, setData] = useState<ProductData>({
    id: product.id,
    title_ru: product.title_ru,
    title_uz: product.title_uz,
    description_ru: product.description_ru,
    description_uz: product.description_uz,
    category_ids: product.category_ids || [],
    width_ids: product.width_ids || [],
    density_ids: product.density_ids || [],
    dyeing_ids: product.dyeing_ids || [],
    composition_ids: product.composition_ids || [],
    img: product.img || '',
    images: product.images || [],
  });

  const [options, setOptions] = useState<Record<string, FilterOption[]>>({
    category: [],
    width: [],
    density: [],
    dyeing: [],
    composition: [],
  });

  useEffect(() => {
    const load = async () => {
      const result: Record<string, FilterOption[]> = {};
      const types = ['category', 'width', 'density', 'dyeing', 'composition'];
      for (const type of types) {
        const res = await fetch(`/api/filters/${type}`);
        const json = await res.json();
        result[type] = json.map((f: any) => ({
          id: f.id,
          label: f.label_ru || f.label || f.value,
        }));
      }
      setOptions(result);
    };
    load();
  }, []);

  const toggleMulti = (field: keyof ProductData, value: number) => {
    const current = new Set((data[field] as number[]) || []);
    current.has(value) ? current.delete(value) : current.add(value);
    setData({...data, [field]: Array.from(current)});
  };

  const handleUpload = async (file: File) => {
    const form = new FormData();
    form.append('file', file);
    const res = await fetch('/api/upload/image', {
      method: 'POST',
      body: form,
    });
    const result = await res.json();
    return `${process.env.NEXT_PUBLIC_DATABASE_URL}${result.url}`;
  };

  const handleSave = async () => {
    const cleanedData = {
      ...data,
      category_ids: Array.isArray(data.category_ids) ? data.category_ids : [],
      width_ids: Array.isArray(data.width_ids) ? data.width_ids : [],
      density_ids: Array.isArray(data.density_ids) ? data.density_ids : [],
      dyeing_ids: Array.isArray(data.dyeing_ids) ? data.dyeing_ids : [],
      composition_ids: Array.isArray(data.composition_ids)
        ? data.composition_ids
        : [],
    };

    const res = await fetch(`/api/products/${data.id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(cleanedData),
    });

    if (res.ok) onClose();
  };

  const renderGroup = (
    label: string,
    field: keyof ProductData,
    opts: FilterOption[]
  ) => (
    <div className={styles.fieldGroup}>
      <label>{label}</label>
      <div className={styles.checkboxScroll}>
        <div className={styles.checkboxGrid}>
          {opts.map(o => (
            <label key={o.id} className={styles.checkboxItem}>
              <input
                type='checkbox'
                checked={(data[field] as number[])?.includes(o.id)}
                onChange={() => toggleMulti(field, o.id)}
              />
              <span>{o.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalCard}>
        <h2>Редактировать товар</h2>

        <div className={styles.section}>
          <div className={styles.fieldGroup}>
            <label>Название RU</label>
            <input
              className={styles.input}
              value={data.title_ru}
              onChange={e => setData({...data, title_ru: e.target.value})}
            />
          </div>
          <div className={styles.fieldGroup}>
            <label>Название UZ</label>
            <input
              className={styles.input}
              value={data.title_uz}
              onChange={e => setData({...data, title_uz: e.target.value})}
            />
          </div>
          <div className={styles.fieldGroup}>
            <label>Описание RU</label>
            <textarea
              className={styles.textarea}
              value={data.description_ru}
              onChange={e => setData({...data, description_ru: e.target.value})}
            />
          </div>
          <div className={styles.fieldGroup}>
            <label>Описание UZ</label>
            <textarea
              className={styles.textarea}
              value={data.description_uz}
              onChange={e => setData({...data, description_uz: e.target.value})}
            />
          </div>
        </div>

        <div className={styles.section}>
          {renderGroup('Категории', 'category_ids', options.category)}
          {renderGroup('Ширина', 'width_ids', options.width)}
          {renderGroup('Плотность', 'density_ids', options.density)}
          {renderGroup('Крашение', 'dyeing_ids', options.dyeing)}
          {renderGroup('Состав', 'composition_ids', options.composition)}
        </div>

        <div className={styles.fieldGroup}>
          <label>Обложка</label>
          {!data.img ? (
            <input
              className={styles.input}
              type='file'
              accept='image/*'
              onChange={async e => {
                const file = e.target.files?.[0];
                if (file) {
                  const url = await handleUpload(file);
                  setData({...data, img: url});
                }
              }}
            />
          ) : (
            <div className={styles.thumb}>
              <Image src={data.img} alt='cover' width={120} height={120} />
              <button onClick={() => setData({...data, img: ''})}>×</button>
            </div>
          )}
        </div>

        <div className={styles.modalActions}>
          <button className='btn' onClick={onClose}>
            Отмена
          </button>
          <button className='btn' onClick={handleSave}>
            💾 Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}
