import { useEffect, useState } from 'react';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const [requestModal, setRequestModal] = useState(null);
  const [requestData, setRequestData] = useState({ name: '', phone: '', comment: '' });
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFiltered(data);
      });
  }, []);

  useEffect(() => {
    let result = [...products];

    if (search) {
      result = result.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
    }

    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }

    setFiltered(result);
  }, [search, selectedCategories, products]);

  const categories = [...new Set(products.map(p => p.category))];

  const toggleCategory = (cat) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSearch('');
  };

  const submitRequest = async () => {
    const res = await fetch('http://localhost:5000/api/requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product_id: requestModal.id,
        name: requestData.name,
        phone: requestData.phone,
        comment: requestData.comment,
      }),
    });

    if (res.ok) {
      alert('Заявка успешно отправлена!');
      setRequestModal(null);
      setRequestData({ name: '', phone: '', comment: '' });
    } else {
      alert('Ошибка при отправке заявки');
    }
  };

  return (
    <div className="products-layout">
      {/* Фильтры слева */}
      <aside className="sidebar-filter">
        <h2>Фильтр</h2>
        <input
          type="text"
          placeholder="Поиск..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="filter-block">
          {categories.map((cat, i) => (
            <label key={i}>
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
              />
              {cat}
            </label>
          ))}
        </div>
        <button className="reset-btn" onClick={resetFilters}>Сбросить все</button>
      </aside>

      {/* Карточки товаров */}
      <main className="products-main">
        <div className="products-grid">
          {filtered.map(p => {
            const colors = JSON.parse(p.colors || '[]');
            const images = JSON.parse(p.images || '[]');

            return (
              <div key={p.id} className="product-card">
                <div className="badge">{p.category}</div>

                {images.length > 0 && (
                  <div className="carousel">
                    <img src={`http://localhost:5000${images[0]}`} alt={p.title} />
                    {images.length > 1 && <span className="image-count">+{images.length - 1}</span>}
                  </div>
                )}

                <h3>{p.title}</h3>
                <p className="spec">{p.material_spec}</p>

                <div className="color-dots">
                  {colors.map((clr, i) => (
                    <span key={i} className="dot" style={{ background: clr }}></span>
                  ))}
                </div>

                <button className="arrow-btn" onClick={() => {
                  setActiveModal(p);
                  setMainImage(JSON.parse(p.images || '[]')[0] || '');
                }}>➤</button>
              </div>
            );
          })}
        </div>
      </main>

      {/* Модалка товара */}
      {activeModal && (
        <div className="product-modal">
          <div className="modal-content product-view">
            <button className="close-btn" onClick={() => setActiveModal(null)}>×</button>

            <div className="modal-left">
              <div className="thumbs">
                {JSON.parse(activeModal.images || '[]').map((img, i) => (
                  <img
                    key={i}
                    src={`http://localhost:5000${img}`}
                    alt={`thumb-${i}`}
                    onClick={() => setMainImage(img)}
                    className={mainImage === img ? 'active' : ''}
                  />
                ))}
              </div>
              <div className="main-img">
                {mainImage && <img src={`http://localhost:5000${mainImage}`} alt="main" />}
              </div>
            </div>

            <div className="modal-right">
              <h2>{activeModal.title}</h2>
              <div className="material">{activeModal.material_spec}</div>

              <div className="desc">
                <h4>Описание:</h4>
                <p>{activeModal.description}</p>
              </div>

              <div className="color-dots">
                {JSON.parse(activeModal.colors || '[]').map((clr, i) => (
                  <span key={i} className="dot" style={{ background: clr }}></span>
                ))}
              </div>

              <button className="apply-now" onClick={() => {
                setRequestModal(activeModal);
                setActiveModal(null);
              }}>
                Оставить заявку
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модалка заявки */}
      {requestModal && (
        <div className="product-modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setRequestModal(null)}>×</button>
            <h2>Оставить заявку на "{requestModal.title}"</h2>

            <input
              type="text"
              placeholder="Ваше имя"
              value={requestData.name}
              onChange={(e) => setRequestData({ ...requestData, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Телефон"
              value={requestData.phone}
              onChange={(e) => setRequestData({ ...requestData, phone: e.target.value })}
            />
            <textarea
              placeholder="Комментарий (необязательно)"
              value={requestData.comment}
              onChange={(e) => setRequestData({ ...requestData, comment: e.target.value })}
            />

            <button className="apply-now" onClick={submitRequest}>Отправить</button>
          </div>
        </div>
      )}
    </div>
  );
}
