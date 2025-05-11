import { useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import AdminLayout from '../../../components/AdminLayout';

export default function AddProduct() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const token = Cookies.get('admin_token');

    const res = await fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        description: desc,
        price,
        category,
        image_url: image,
      }),
    });

    if (res.ok) {
      router.push('/admin/products');
    } else {
      setError('Ошибка при добавлении товара');
    }
  };

  return (
    <AdminLayout>
      <div style={styles.wrapper}>
        <div style={styles.formBox}>
          <h2 style={styles.title}>➕ Новый товар</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input placeholder="Название" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <textarea placeholder="Описание" value={desc} onChange={(e) => setDesc(e.target.value)} />
            <input type="number" placeholder="Цена" value={price} onChange={(e) => setPrice(e.target.value)} />
            <input placeholder="Категория" value={category} onChange={(e) => setCategory(e.target.value)} />
            <input placeholder="Изображение (URL)" value={image} onChange={(e) => setImage(e.target.value)} />
            {error && <p style={styles.error}>{error}</p>}
            <button type="submit" style={styles.btn}>Сохранить</button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}

const styles = {
  wrapper: {
    display: 'grid',
    placeItems: 'center',
    minHeight: 'calc(100vh - 80px)',
  },
  formBox: {
    background: 'rgba(255,255,255,0.6)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(200,200,200,0.3)',
    borderRadius: '16px',
    padding: '30px',
    width: '100%',
    maxWidth: '600px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  title: {
    fontSize: '22px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  btn: {
    background: '#4a90e2',
    color: '#fff',
    padding: '10px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    fontSize: '14px',
  }
};
