import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Cookies from 'js-cookie';

interface Option {
  id: number;
  label_ru: string;
}

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddProductModal({ onClose, onSuccess }: Props) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    title_ru: '',
    title_uz: '',
    description_ru: '',
    description_uz: '',
    category_id: '',
    width_ids: [] as number[],
    density_id: '',
    dyeing_id: '',
    composition_id: '',
    img: '',
    images: [] as string[],
  });

  const [filters, setFilters] = useState<Record<string, Option[]>>({});

  useEffect(() => {
    const fetchFilters = async () => {
      const types = ['category', 'width', 'density', 'dyeing', 'composition'];
      const fetched: Record<string, Option[]> = {};
      for (const type of types) {
        const res = await fetch(`/api/filters/${type}`);
        const data = await res.json();
        fetched[type] = data;
      }
      setFilters(fetched);
    };
    fetchFilters();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleWidth = (id: number) => {
    setForm((prev) => ({
      ...prev,
      width_ids: prev.width_ids.includes(id)
        ? prev.width_ids.filter((i) => i !== id)
        : [...prev.width_ids, id],
    }));
  };

  const handleUpload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload/image', {
      method: 'POST',
      body: formData,
    });
    const result = await res.json();
    return result.url;
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    const token = Cookies.get('admin_token');
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    if (res.ok) onSuccess();
  };

  const steps = [
    'Инфо', 'Категория и фильтры', 'Изображения'
  ];

  return (
    <div className="modal">
      <div className="modal-content dark">
        <div className="wizard-steps">
          {steps.map((s, i) => (
            <span key={i} className={i === step ? 'active' : ''}>{s}</span>
          ))}
        </div>

        <form onSubmit={handleSave} className="product-form">
          {/* Step 0: Info */}
          <div className={`wizard-step ${step === 0 ? 'active' : ''}`}>
            <label>Название RU</label>
            <input name="title_ru" value={form.title_ru} onChange={handleChange} />

            <label>Название UZ</label>
            <input name="title_uz" value={form.title_uz} onChange={handleChange} />

            <label>Описание RU</label>
            <textarea name="description_ru" value={form.description_ru} onChange={handleChange} />

            <label>Описание UZ</label>
            <textarea name="description_uz" value={form.description_uz} onChange={handleChange} />
          </div>

          {/* Step 1: Filters */}
          <div className={`wizard-step ${step === 1 ? 'active' : ''}`}>
            <label>Категория</label>
            <select name="category_id" value={form.category_id} onChange={handleChange}>
              <option value="">Выбрать категорию</option>
              {filters.category?.map((opt) => (
                <option key={opt.id} value={opt.id}>{opt.label_ru}</option>
              ))}
            </select>

            <fieldset>
              <legend>Ширина</legend>
              {filters.width?.map((opt) => (
                <label key={opt.id}>
                  <input
                    type="checkbox"
                    checked={form.width_ids.includes(opt.id)}
                    onChange={() => toggleWidth(opt.id)}
                  /> {opt.label_ru}
                </label>
              ))}
            </fieldset>

            <label>Плотность</label>
            <select name="density_id" value={form.density_id} onChange={handleChange}>
              <option value="">Выбрать</option>
              {filters.density?.map((opt) => (
                <option key={opt.id} value={opt.id}>{opt.label_ru}</option>
              ))}
            </select>

            <label>Крашение</label>
            <select name="dyeing_id" value={form.dyeing_id} onChange={handleChange}>
              <option value="">Выбрать</option>
              {filters.dyeing?.map((opt) => (
                <option key={opt.id} value={opt.id}>{opt.label_ru}</option>
              ))}
            </select>

            <label>Состав</label>
            <select name="composition_id" value={form.composition_id} onChange={handleChange}>
              <option value="">Выбрать</option>
              {filters.composition?.map((opt) => (
                <option key={opt.id} value={opt.id}>{opt.label_ru}</option>
              ))}
            </select>
          </div>

          {/* Step 2: Images */}
          <div className={`wizard-step ${step === 2 ? 'active' : ''}`}>
            <label>Обложка</label>
            {form.img && <img src={form.img} alt="cover" style={{ width: 120 }} />}
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const url = await handleUpload(file);
                  setForm((f) => ({ ...f, img: url }));
                }
              }}
            />

            <label>Галерея</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={async (e) => {
                const files = Array.from(e.target.files || []);
                const urls = await Promise.all(files.map(handleUpload));
                setForm((f) => ({ ...f, images: [...f.images, ...urls] }));
              }}
            />
            <div className="gallery-preview">
              {form.images.map((img, i) => (
                <img key={i} src={img} alt={`img-${i}`} />
              ))}
            </div>
          </div>
        </form>
      </div>

      {/* Контролы вынесены наружу */}
      <div className="modal-actions" style={{ marginTop: 20, display: 'flex', justifyContent: 'center', gap: '20px' }}>
        {step > 0 ? (
          <button type="button" onClick={() => setStep(step - 1)}>Назад</button>
        ) : (
          <button type="button" onClick={onClose}>Отмена</button>
        )}
        {step < steps.length - 1 ? (
          <button type="button" onClick={() => setStep(step + 1)}>Далее</button>
        ) : (
          <button type="button" onClick={(e) => handleSave(e as any)}>Сохранить</button>
        )}
      </div>
    </div>
  );
}
