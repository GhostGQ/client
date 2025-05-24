import { useEffect, useState } from 'react';
import { FiTag, FiTrash2, FiList } from 'react-icons/fi';

interface LangBlock {
  name: string;
  subcategories: string[];
}

interface Props {
  onClose: () => void;
  category?: {
    id: string;
    ru: LangBlock;
    uz: LangBlock;
  } | null;
}

export default function CategoryModal({ onClose, category }: Props) {
  const [ru, setRu] = useState<LangBlock>({ name: '', subcategories: [] });
  const [uz, setUz] = useState<LangBlock>({ name: '', subcategories: [] });

  useEffect(() => {
    if (category?.ru && category?.uz) {
      setRu({ ...category.ru });
      setUz({ ...category.uz });
    }
  }, [category]);

  const handleChangeSub = (lang: 'ru' | 'uz', index: number, value: string) => {
    const update = [...(lang === 'ru' ? ru.subcategories : uz.subcategories)];
    update[index] = value;
    lang === 'ru'
      ? setRu({ ...ru, subcategories: update })
      : setUz({ ...uz, subcategories: update });
  };

  const addSubBoth = () => {
    setRu({ ...ru, subcategories: [...ru.subcategories, ''] });
    setUz({ ...uz, subcategories: [...uz.subcategories, ''] });
  };

  const removeSub = (index: number) => {
    const ruSubs = [...ru.subcategories];
    const uzSubs = [...uz.subcategories];
    ruSubs.splice(index, 1);
    uzSubs.splice(index, 1);
    setRu({ ...ru, subcategories: ruSubs });
    setUz({ ...uz, subcategories: uzSubs });
  };

  const handleSave = async () => {
    const url = category
      ? `/api/categories/${category.id}`
      : '/api/categories/dual';

    const method = category ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ru, uz }),
    });

    if (res.ok) onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card dual-modal">
        <h2 className="modal-title">{category ? 'Редактировать' : 'Добавить'} категорию</h2>

        <div className="dual-column">
          {/* RU */}
          <div className="lang-block">
            <h3>🇷🇺 Русский</h3>
            <div className="input-group">
              <FiTag className="input-icon" />
              <input
                type="text"
                placeholder="Название категории"
                value={ru.name}
                onChange={(e) => setRu({ ...ru, name: e.target.value })}
              />
            </div>

            <label className="section-label">Подкатегории:</label>
            {ru.subcategories.map((sub, i) => (
              <div key={i} className="input-group">
                <FiList className="input-icon" />
                <input
                  type="text"
                  value={sub}
                  placeholder="Подкатегория (RU)"
                  onChange={(e) => handleChangeSub('ru', i, e.target.value)}
                />
                <button className="icon-btn red" onClick={() => removeSub(i)}>
                  <FiTrash2 />
                </button>
              </div>
            ))}
          </div>

          {/* UZ */}
          <div className="lang-block">
            <h3>🇺🇿 O‘zbekcha</h3>
            <div className="input-group">
              <FiTag className="input-icon" />
              <input
                type="text"
                placeholder="Kategoriya nomi"
                value={uz.name}
                onChange={(e) => setUz({ ...uz, name: e.target.value })}
              />
            </div>

            <label className="section-label">Subkategoriyalar:</label>
            {uz.subcategories.map((sub, i) => (
              <div key={i} className="input-group">
                <FiList className="input-icon" />
                <input
                  type="text"
                  value={sub}
                  placeholder="Subkategoriya (UZ)"
                  onChange={(e) => handleChangeSub('uz', i, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn add-sub" onClick={addSubBoth}>➕ Подкатегория</button>
          <button className="btn cancel" onClick={onClose}>Отмена</button>
          <button className="btn save" onClick={handleSave}>Сохранить</button>
        </div>
      </div>
    </div>
  );
}
