import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import styles from './ProductModalWizard.module.css';

interface Category {
  id: string;
  name: string;
  subcategories: { id: string; name: string; category_id: string }[];
}

interface ProductData {
  title_ru: string;
  title_uz: string;
  description_ru: string;
  description_uz: string;
  categories: string[];
  subcategories: string[];
  img: string;
  images: string[];
}

export default function ProductModalWizard({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [data, setData] = useState<ProductData>({
    title_ru: '',
    title_uz: '',
    description_ru: '',
    description_uz: '',
    categories: [],
    subcategories: [],
    img: '',
    images: [],
  });

  useEffect(() => {
    fetch('/api/categories?lang=ru')
      .then((res) => res.json())
      .then((res) => setCategories(res.categories || []));
  }, []);

  const toggleMulti = (field: keyof ProductData, value: string) => {
    const set = new Set(data[field] as string[]);
    set.has(value) ? set.delete(value) : set.add(value);
    setData({ ...data, [field]: Array.from(set) });
  };

  const filteredSubcategories = categories
    .filter(c => data.categories.includes(c.id))
    .flatMap(c => c.subcategories);

  const handleUpload = async (file: File) => {
    const form = new FormData();
    form.append('file', file);

    const res = await fetch('/api/upload/image', {
      method: 'POST',
      body: form
    });

    const data = await res.json();
    return `http://localhost:5000${data.url}`;
  };

  const handleSave = async () => {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) onClose();
  };

  const steps = [
    {
      label: 'Основная информация',
      content: (
        <div className={styles.section}>
          <div className={styles.fieldGroup}>
            <label>Название RU</label>
            <input className={styles.input} value={data.title_ru} onChange={(e) => setData({ ...data, title_ru: e.target.value })} />
          </div>
          <div className={styles.fieldGroup}>
            <label>Название UZ</label>
            <input className={styles.input} value={data.title_uz} onChange={(e) => setData({ ...data, title_uz: e.target.value })} />
          </div>
          <div className={styles.fieldGroup}>
            <label>Описание RU</label>
            <textarea className={styles.textarea} value={data.description_ru} onChange={(e) => setData({ ...data, description_ru: e.target.value })} />
          </div>
          <div className={styles.fieldGroup}>
            <label>Описание UZ</label>
            <textarea className={styles.textarea} value={data.description_uz} onChange={(e) => setData({ ...data, description_uz: e.target.value })} />
          </div>
        </div>
      )
    },
    {
      label: 'Категории и подкатегории',
      content: (
        <div className={styles.section}>
          <div className={styles.fieldGroup}>
            <label>Категории</label>
            <div className={styles.multiSelectBox}>
              {categories.map((cat) => (
                <label key={cat.id}>
                  <input
                    type="checkbox"
                    checked={data.categories.includes(cat.id)}
                    onChange={() => toggleMulti('categories', cat.id)}
                  /> {cat.name}
                </label>
              ))}
            </div>
          </div>
          <div className={styles.fieldGroup}>
            <label>Подкатегории</label>
            <div className={styles.multiSelectBox}>
              {filteredSubcategories.map((sub) => (
                <label key={sub.id}>
                  <input
                    type="checkbox"
                    checked={data.subcategories.includes(sub.id)}
                    onChange={() => toggleMulti('subcategories', sub.id)}
                  /> {sub.name}
                </label>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      label: 'Изображения',
      content: (
        <div className={styles.section}>
          <div className={styles.fieldGroup}>
            <label>Обложка</label>
            {!data.img ? (
              <input
                className={styles.input}
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const url = await handleUpload(file);
                    setData({ ...data, img: url });
                  }
                }}
              />
            ) : (
              <div className={styles.thumb}>
                <Image src={data.img} alt="cover" width={120} height={120} />
                <button onClick={() => setData({ ...data, img: '' })}>×</button>
              </div>
            )}
          </div>
          <div className={styles.fieldGroup}>
            <label>Галерея</label>
            <input
              className={styles.input}
              type="file"
              multiple
              accept="image/*"
              onChange={async (e) => {
                const files = Array.from(e.target.files || []);
                const uploads = await Promise.all(files.map(handleUpload));
                setData({ ...data, images: [...data.images, ...uploads] });
              }}
            />
            <div className={styles.imagePreview}>
              {data.images.map((src, i) => (
                <div key={i} className={styles.thumb}>
                  <Image src={src} alt={`img-${i}`} width={100} height={100} />
                  <button onClick={() => {
                    const imgs = [...data.images];
                    imgs.splice(i, 1);
                    setData({ ...data, images: imgs });
                  }}>×</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      label: 'Подтверждение',
      content: (
        <div className={styles.section}>
          <p><strong>Название RU:</strong> {data.title_ru}</p>
          <p><strong>Название UZ:</strong> {data.title_uz}</p>
          <p><strong>Описание RU:</strong> {data.description_ru}</p>
          <p><strong>Описание UZ:</strong> {data.description_uz}</p>
          <p><strong>Категорий:</strong> {data.categories.length}</p>
          <p><strong>Подкатегорий:</strong> {data.subcategories.length}</p>
          <p><strong>Изображений:</strong> {data.images.length}</p>
          <button className="btn" onClick={handleSave}>Сохранить</button>
        </div>
      )
    }
  ];

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalCard}>
        <div className={styles.wizardHeader}>
          <h2>{steps[step].label}</h2>
          <div className={styles.wizardNav}>
            {step > 0 && <button onClick={() => setStep(step - 1)}><FiChevronLeft /></button>}
            {step < steps.length - 1 && <button onClick={() => setStep(step + 1)}><FiChevronRight /></button>}
          </div>
        </div>
        <div className={styles.wizardContent}>{steps[step].content}</div>
        <div className={styles.modalActions}>
          <button className="btn" onClick={onClose}>Отмена</button>
        </div>
      </div>
    </div>
  );
}
