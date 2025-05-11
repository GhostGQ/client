import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import AdminLayout from '../../components/AdminLayout';
import ProductModal from '../../components/ProductModal';
import ConfirmModal from '../../components/ConfirmModal';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [colorFilter, setColorFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const fetchProducts = async () => {
    const res = await fetch('http://localhost:5000/api/products');
    const data = await res.json();
    setProducts(data);
    setFiltered(data);
  };

  const handleDelete = async () => {
    const token = Cookies.get('admin_token');
    if (!productToDelete) return;

    await fetch(`http://localhost:5000/api/products/${productToDelete.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    setDeleteModalOpen(false);
    setProductToDelete(null);
    fetchProducts();
  };

  const applyFilters = () => {
    let result = [...products];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(p => p.title.toLowerCase().includes(term));
    }

    if (categoryFilter) {
      result = result.filter(p => p.category === categoryFilter);
    }

    if (colorFilter) {
      result = result.filter(p => JSON.parse(p.colors || '[]').includes(colorFilter));
    }

    switch (sortOrder) {
      case 'newest':
        result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        break;
      case 'az':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'za':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    setFiltered(result);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
    setColorFilter('');
    setSortOrder('newest');
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, categoryFilter, colorFilter, sortOrder, products]);

  const uniqueCategories = [...new Set(products.map(p => p.category))];
  const allColors = [...new Set(products.flatMap(p => JSON.parse(p.colors || '[]')))];

  return (
    <AdminLayout>
      <div className="admin-wrapper">
        <div className="admin-container">
          <div className="admin-header">
            <h2 className="admin-title"><i className="fas fa-boxes-stacked"></i> Товары</h2>
            <button className="admin-btn" onClick={() => { setEditProduct(null); setModalOpen(true); }}>
              <i className="fas fa-plus"></i> Добавить
            </button>
          </div>

          <div className="filters">
            <input type="text" className="filter-input" placeholder="Поиск по названию" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <select className="filter-input" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="">Все категории</option>
              {uniqueCategories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
            </select>
            <select className="filter-input" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="newest">Сначала новые</option>
              <option value="oldest">Сначала старые</option>
              <option value="az">По названию A–Z</option>
              <option value="za">По названию Z–A</option>
            </select>
            <button className="filter-reset-btn" onClick={resetFilters}>
              <i className="fas fa-rotate-left"></i> Сбросить
            </button>
          </div>

          <div className="product-grid">
            {filtered.map((p) => {
              const imageArr = JSON.parse(p.images || '[]');
              const colors = JSON.parse(p.colors || '[]');

              return (
                <div key={p.id} className="product-card">
                  {imageArr[0] && (
                    <img src={`http://localhost:5000${imageArr[0]}`} alt={p.title} className="product-img" />
                  )}
                  <h3 className="product-title">{p.title}</h3>
                  <p className="product-sub">Категория: {p.category}</p>
                  <p className="product-sub">Материал: {p.material_type}</p>
                  <p className="product-sub">Состав: {p.material_spec}</p>

                  <div className="product-colors">
                    {colors.map((clr, i) => (
                      <div key={i} className="product-color" style={{ background: clr }} />
                    ))}
                  </div>

                  <div className="product-actions">
                    <button onClick={() => { setEditProduct(p); setModalOpen(true); }} className="icon-btn blue">
                      <i className="fas fa-pen"></i>
                    </button>
                    <button onClick={() => { setProductToDelete(p); setDeleteModalOpen(true); }} className="icon-btn red">
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <ProductModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSaved={fetchProducts}
        existing={editProduct}
      />

      <ConfirmModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Удалить товар?"
        description={`Вы уверены, что хотите удалить «${productToDelete?.title}»? Это действие необратимо.`}
      />
    </AdminLayout>
  );
}
