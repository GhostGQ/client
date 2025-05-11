import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const predefinedColors = ['#000000', '#ffffff', '#beige', '#ff0000', '#00ff00', '#0000ff'];

export default function ProductModal({ open, onClose, onSaved, existing }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('');
  const [materialType, setMaterialType] = useState('');
  const [materialSpec, setMaterialSpec] = useState('');
  const [selectedColors, setSelectedColors] = useState([]);
  const [customColor, setCustomColor] = useState('#ffffff');
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (existing) {
      setTitle(existing.title || '');
      setDesc(existing.description || '');
      setCategory(existing.category || '');
      setMaterialType(existing.material_type || '');
      setMaterialSpec(existing.material_spec || '');
      setSelectedColors(() => {
        try {
          const parsed = JSON.parse(existing.colors || '[]');
          return Array.isArray(parsed) ? parsed : [];
        } catch {
          return [];
        }
      });
      setImages([]);
    } else {
      setTitle('');
      setDesc('');
      setCategory('');
      setMaterialType('');
      setMaterialSpec('');
      setSelectedColors([]);
      setCustomColor('#ffffff');
      setImages([]);
    }
  }, [existing]);
  

  const toggleColor = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleSubmit = async () => {
    const token = Cookies.get('admin_token');
    const formData = new FormData();

    formData.append('title', title);
    formData.append('description', desc);
    formData.append('category', category);
    formData.append('material_type', materialType);
    formData.append('material_spec', materialSpec);
    formData.append('colors', JSON.stringify(selectedColors));
    images.forEach((img) => formData.append('images', img));

    const method = existing ? 'PUT' : 'POST';
    const url = existing
      ? `http://localhost:5000/api/products/${existing.id}`
      : 'http://localhost:5000/api/products';

    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (res.ok) {
      onSaved();
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-form">
          <h2>{existing ? '✏️ Редактировать товар' : '➕ Новый товар'}</h2>

          <div className="form-row">
            <label><i className="fas fa-heading"></i> Название</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="form-row">
            <label><i className="fas fa-align-left"></i> Описание</label>
            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
          </div>

          <div className="form-row">
            <label><i className="fas fa-layer-group"></i> Категория</label>
            <input value={category} onChange={(e) => setCategory(e.target.value)} />
          </div>

          <div className="form-row">
            <label><i className="fas fa-tshirt"></i> Тип материала</label>
            <input value={materialType} onChange={(e) => setMaterialType(e.target.value)} />
          </div>

          <div className="form-row">
            <label><i className="fas fa-info-circle"></i> Состав</label>
            <input value={materialSpec} onChange={(e) => setMaterialSpec(e.target.value)} placeholder="Напр: 110±7 100% хлопок" />
          </div>

          <div className="form-row">
            <label><i className="fas fa-palette"></i> Цвета</label>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {predefinedColors.map((color) => (
                <div
                  key={color}
                  onClick={() => toggleColor(color)}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    border: selectedColors.includes(color) ? '2px solid #fff' : '2px solid transparent',
                    background: color,
                    cursor: 'pointer',
                  }}
                />
              ))}
              <input
                type="color"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                onBlur={() => {
                  if (!selectedColors.includes(customColor)) {
                    setSelectedColors([...selectedColors, customColor]);
                  }
                }}
              />
            </div>
          </div>

          {selectedColors.length > 0 && (
            <div className="form-row">
              <label>Выбранные цвета</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {selectedColors.map((clr, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{
                      width: '22px', height: '22px', background: clr,
                      borderRadius: '5px', border: '1px solid #999'
                    }} />
                    <button onClick={() => toggleColor(clr)} style={{
                      color: '#fff',
                      background: 'none',
                      border: 'none',
                      fontSize: '18px',
                      cursor: 'pointer'
                    }}>✖</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="modal-preview">
          <div className="form-row">
            <label><i className="fas fa-images"></i> Изображения</label>
            <input type="file" accept="image/*" multiple onChange={handleImageChange} />
          </div>

          {images.length > 0 && (
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
              {images.map((img, i) => (
                <li key={i} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
                  <span>{img.name}</span>
                  <button onClick={() => removeImage(i)} style={{
                    color: 'red',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}>Удалить</button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="modal-actions">
          <button onClick={handleSubmit}>💾 Сохранить</button>
          <button onClick={onClose}>❌ Отмена</button>
        </div>
      </div>
    </div>
  );
}
