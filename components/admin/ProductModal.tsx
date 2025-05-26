import { useState, useEffect, ChangeEvent, FormEvent } from 'react';

interface Category {
  id: string;
  name: string;
  subcategories: { id: string; name: string }[];
}
interface Product {
  id?: string;
  img: string;
  title_ru: string;
  title_uz: string;
  description: string;
  subcategory_id: string;
  width: string;
  density: string;
  dye: string;
  composition: string;
  colors: string[];
  images: string[];
}

interface Props {
  onClose: () => void;
  product: Product | null;
  categories: Category[];
}

export default function ProductModal({ onClose, product, categories }: Props) {
  const [form, setForm] = useState<Product>({
    img: '',
    title_ru: '',
    title_uz: '',
    description: '',
    subcategory_id: '',
    width: '',
    density: '',
    dye: '',
    composition: '',
    colors: [],
    images: [],
  });
  const [subcats, setSubcats] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    if (product) setForm(product);
  }, [product]);

  useEffect(() => {
    if (!form.subcategory_id) {
      setSubcats([]);
      return;
    }
    fetch('/api/categories?lang=ru')
      .then((r) => r.json())
      .then((data) => {
        const cat = data.categories.find((c: any) => c.id === form.subcategory_id?.split(':')[0]);
        setSubcats(cat ? cat.subcategories : []);
      });
  }, [form.subcategory_id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleArray = (name: 'colors' | 'images', raw: string) => {
    setForm((f) => ({ ...f, [name]: raw.split(',').map((s) => s.trim()).filter(Boolean) }));
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
    const url = product ? `/api/products/${product.id}` : '/api/products';
    const method = product ? 'PUT' : 'POST';
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>{product ? 'Редактировать товар' : 'Новый товар'}</h2>
        <form onSubmit={handleSave} className="product-form">

          <div className="form-block">
            <label>Обложка (изображение)</label>
            {form.img && (
              <div style={{ marginBottom: '8px' }}>
                <img src={form.img} alt="cover" style={{ width: 120, height: 'auto' }} />
              </div>
            )}
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
          </div>

          <div className="form-block">
            <label>Название RU</label>
            <input name="title_ru" value={form.title_ru} onChange={handleChange} />
          </div>
          <div className="form-block">
            <label>Название UZ</label>
            <input name="title_uz" value={form.title_uz} onChange={handleChange} />
          </div>

          <div className="form-block">
            <label>Описание</label>
            <textarea name="description" value={form.description} onChange={handleChange} />
          </div>

          <div className="form-block">
            <label>Категория</label>
            <select
              name="subcategory_id"
              value={form.subcategory_id}
              onChange={handleChange}
            >
              <option value="">Выберите категорию / подкатегорию</option>
              {categories.map((c) => (
                c.subcategories.map((s: any) => (
                  <option key={s.id} value={s.id}>
                    {c.name} → {s.name}
                  </option>
                ))
              ))}
            </select>
          </div>

          <div className="form-block">
            <label>Ширина</label>
            <input name="width" value={form.width} onChange={handleChange} />
          </div>
          <div className="form-block">
            <label>Плотность</label>
            <input name="density" value={form.density} onChange={handleChange} />
          </div>
          <div className="form-block">
            <label>Тип крашения</label>
            <input name="dye" value={form.dye} onChange={handleChange} />
          </div>
          <div className="form-block">
            <label>Состав</label>
            <input name="composition" value={form.composition} onChange={handleChange} />
          </div>

          <div className="form-block">
            <label>Цвета (через запятую)</label>
            <input
              value={form.colors.join(', ')}
              onChange={(e) => handleArray('colors', e.target.value)}
            />
          </div>

          <div className="form-block">
            <label>Галерея изображений</label>
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
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
              {form.images.map((src, i) => (
                <div key={i} style={{ position: 'relative' }}>
                  <img src={src} alt={`img-${i}`} style={{ width: 80, height: 80, objectFit: 'cover' }} />
                  <button
                    type="button"
                    style={{
                      position: 'absolute',
                      top: -5,
                      right: -5,
                      background: 'red',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: 20,
                      height: 20,
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      const imgs = [...form.images];
                      imgs.splice(i, 1);
                      setForm((f) => ({ ...f, images: imgs }));
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn cancel" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="btn save">
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
