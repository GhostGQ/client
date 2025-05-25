import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import styles from './ProductModalWizard.module.css';


interface ProductData {
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

export default function ProductModalWizard({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<ProductData>({
    title_ru: '',
    title_uz: '',
    description_ru: '',
    description_uz: '',
    category_ids: [],
    width_ids: [],
    density_ids: [],
    dyeing_ids: [],
    composition_ids: [],
    img: '',
    images: [],
  });
  const [errors, setErrors] = useState({
    title_ru: false,
    title_uz: false,
    description_ru: false,
    description_uz: false,
  });
  
  const [categoryOptions, setCategoryOptions] = useState<FilterOption[]>([]);
  const [widthOptions, setWidthOptions] = useState<FilterOption[]>([]);
  const [densityOptions, setDensityOptions] = useState<FilterOption[]>([]);
  const [dyeingOptions, setDyeingOptions] = useState<FilterOption[]>([]);
  const [compositionOptions, setCompositionOptions] = useState<FilterOption[]>([]);

  useEffect(() => {
    const fetchOptions = async (filterId: string, setter: Function) => {
      const res = await fetch(`/api/filters/${filterId}`);
      const json = await res.json();
      const normalized = Array.isArray(json)
        ? json.map((item: any) => ({
            id: item.id,
            label: item.label_ru || item.label || item.value
          }))
        : [];
      setter(normalized);
    };

    fetchOptions('category', setCategoryOptions);
    fetchOptions('width', setWidthOptions);
    fetchOptions('density', setDensityOptions);
    fetchOptions('dyeing', setDyeingOptions);
    fetchOptions('composition', setCompositionOptions);
  }, []);

  const toggleMulti = (field: keyof ProductData, value: number) => {
    const current = new Set((data[field] as number[]) || []);
    current.has(value) ? current.delete(value) : current.add(value);
    setData({ ...data, [field]: Array.from(current) });
  };

  const handleUpload = async (file: File) => {
    const form = new FormData();
    form.append('file', file);
    const res = await fetch('/api/upload/image', {
      method: 'POST',
      body: form
    });
    const result = await res.json();
    return `http://localhost:5000${result.url}`;
  };

  const handleSave = async () => {
    const cleanedData = {
      ...data,
      category_ids: Array.isArray(data.category_ids) ? data.category_ids : [],
      width_ids: Array.isArray(data.width_ids) ? data.width_ids : [],
      density_ids: Array.isArray(data.density_ids) ? data.density_ids : [],
      dyeing_ids: Array.isArray(data.dyeing_ids) ? data.dyeing_ids : [],
      composition_ids: Array.isArray(data.composition_ids) ? data.composition_ids : [],
    };

    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cleanedData),
    });

    if (res.ok) onClose();
  };

  const renderCheckboxGroup = (
    options: FilterOption[],
    selected: number[],
    field: keyof ProductData
  ) => (
    <div className={styles.checkboxScroll}>
      <div className={styles.checkboxGrid}>
        {options.map((opt) => (
          <label key={opt.id} className={styles.checkboxItem}>
            <input
              type="checkbox"
              checked={selected.includes(opt.id)}
              onChange={() => toggleMulti(field, opt.id)}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const steps = [
    {
      label: 'Основная информация',
      content: (
        <div className={styles.section}>
          <div className={styles.fieldGroup}>
            <label>Название RU <span style={{ color: 'red' }}>*</span></label>
            <input
              className={`${styles.input} ${errors.title_ru ? styles.error : ''}`}
              value={data.title_ru}
              onChange={(e) => setData({ ...data, title_ru: e.target.value })}
            />
            {errors.title_ru && <p className={styles.errorText}>Это обязательное поле</p>}
          </div>
          <div className={styles.fieldGroup}>
            <label>Название UZ <span style={{ color: 'red' }}>*</span></label>
            <input
              className={`${styles.input} ${errors.title_uz ? styles.error : ''}`}
              value={data.title_uz}
              onChange={(e) => setData({ ...data, title_uz: e.target.value })}
            />
            {errors.title_uz && <p className={styles.errorText}>Это обязательное поле</p>}
          </div>
          <div className={styles.fieldGroup}>
            <label>Описание RU <span style={{ color: 'red' }}>*</span></label>
            <textarea
              className={`${styles.textarea} ${errors.description_ru ? styles.error : ''}`}
              value={data.description_ru}
              onChange={(e) => setData({ ...data, description_ru: e.target.value })}
            />
            {errors.description_ru && <p className={styles.errorText}>Это обязательное поле</p>}
          </div>
          <div className={styles.fieldGroup}>
            <label>Описание UZ <span style={{ color: 'red' }}>*</span></label>
            <textarea
              className={`${styles.textarea} ${errors.description_uz ? styles.error : ''}`}
              value={data.description_uz}
              onChange={(e) => setData({ ...data, description_uz: e.target.value })}
            />
            {errors.description_uz && <p className={styles.errorText}>Это обязательное поле</p>}
          </div>
        </div>
      )
    },
    {
      label: 'Категории и параметры',
      content: (
        <div className={styles.section}>
          <div className={styles.fieldGroup}><label>Категории</label>{renderCheckboxGroup(categoryOptions, data.category_ids, 'category_ids')}</div>
          <div className={styles.fieldGroup}><label>Ширина</label>{renderCheckboxGroup(widthOptions, data.width_ids, 'width_ids')}</div>
          <div className={styles.fieldGroup}><label>Плотность</label>{renderCheckboxGroup(densityOptions, data.density_ids, 'density_ids')}</div>
          <div className={styles.fieldGroup}><label>Крашение</label>{renderCheckboxGroup(dyeingOptions, data.dyeing_ids, 'dyeing_ids')}</div>
          <div className={styles.fieldGroup}><label>Состав</label>{renderCheckboxGroup(compositionOptions, data.composition_ids, 'composition_ids')}</div>
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
              <input className={styles.input} type="file" accept="image/*" onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const url = await handleUpload(file);
                  setData({ ...data, img: url });
                }
              }} />
            ) : (
              <div className={styles.thumb}>
                <Image src={data.img} alt="cover" width={120} height={120} />
                <button onClick={() => setData({ ...data, img: '' })}>×</button>
              </div>
            )}
          </div>
          <div className={styles.fieldGroup}>
            <label>Галерея</label>
            <input className={styles.input} type="file" multiple accept="image/*" onChange={async (e) => {
              const files = Array.from(e.target.files || []);
              const uploads = await Promise.all(files.map(handleUpload));
              setData({ ...data, images: [...data.images, ...uploads] });
            }} />
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
          <p><strong>Категорий:</strong> {data.category_ids.join(', ')}</p>
          <p><strong>Ширина:</strong> {data.width_ids.join(', ')}</p>
          <p><strong>Плотность:</strong> {data.density_ids.join(', ')}</p>
          <p><strong>Крашение:</strong> {data.dyeing_ids.join(', ')}</p>
          <p><strong>Состав:</strong> {data.composition_ids.join(', ')}</p>
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
