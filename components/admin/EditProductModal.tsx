import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import styles from './ProductModalWizard.module.css';

export default function EditProductModal({ product, onClose }: { product: any, onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [categories, setCategories] = useState<any[]>([]);
  const [data, setData] = useState({
    ...product,
    category_ids: product?.category_ids || [],
    subcategory_ids: product?.subcategory_ids || [],
    images: product?.images || [],
  });

  useEffect(() => {
    fetch('/api/categories?lang=ru')
      .then((res) => res.json())
      .then((res) => setCategories(res.categories || []));
  }, []);

  const toggleMulti = (field: string, value: string) => {
    const set = new Set(data[field]);
    set.has(value) ? set.delete(value) : set.add(value);
    setData({ ...data, [field]: Array.from(set) });
  };

  const filteredSubcategories = (categories || [])
    .filter((c: any) => data.category_ids.includes(c.id))
    .flatMap((c: any) => c.subcategories || []);

    const uploadImage = async (file: File): Promise<string> => {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/upload/image', {
        method: 'POST',
        body: form
      });
      const json = await res.json();
      return `${process.env.NEXT_PUBLIC_API_URL}${json.url}`;
    };
    

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = await uploadImage(file);
      setData({ ...data, img: url });
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
const uploaded = await Promise.all(files.map(uploadImage));
setData({ ...data, images: [...data.images, ...uploaded] });
  };

  const handleUpdate = async () => {
    const res = await fetch(`/api/products/${product.id}`, {
      method: 'PUT',
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
              {(categories || []).map((cat: any) => (
                <label key={cat.id}>
                  <input
                    type="checkbox"
                    checked={data.category_ids.includes(cat.id)}
                    onChange={() => toggleMulti('category_ids', cat.id)}
                  /> {cat.name}
                </label>
              ))}
            </div>
          </div>
          <div className={styles.fieldGroup}>
            <label>Подкатегории</label>
            <div className={styles.multiSelectBox}>
              {filteredSubcategories.map((sub: any) => (
                <label key={sub.id}>
                  <input
                    type="checkbox"
                    checked={data.subcategory_ids.includes(sub.id)}
                    onChange={() => toggleMulti('subcategory_ids', sub.id)}
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
              <input className={styles.input} type="file" accept="image/*" onChange={handleCoverUpload} />
            ) : (
              <div className={styles.thumb}>
                {/* @ts-ignore */}
                <Image src={data.img} alt="cover" width={120} height={120} unoptimized />
                <button onClick={() => setData({ ...data, img: '' })}>×</button>
              </div>
            )}
          </div>
          <div className={styles.fieldGroup}>
            <label>Галерея</label>
            <input className={styles.input} type="file" multiple accept="image/*" onChange={handleGalleryUpload} />
            <div className={styles.imagePreview}>
              {Array.isArray(data.images) && data.images.map((src: string, i: number) => (
                <div key={i} className={styles.thumb}>
                  {/* @ts-ignore */}
                  <Image src={src} alt={`img-${i}`} width={100} height={100} unoptimized />
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
          <p><strong>Категорий:</strong> {data.category_ids?.length || 0}</p>
          <p><strong>Подкатегорий:</strong> {data.subcategory_ids?.length || 0}</p>
          <button className="btn" onClick={handleUpdate}>Сохранить изменения</button>
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
