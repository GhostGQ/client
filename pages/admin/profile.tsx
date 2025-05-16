import { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import Cookies from 'js-cookie';

export default function AdminProfile() {
  const [admin, setAdmin] = useState({ name: '', email: '' });
  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const fetchAdmin = async () => {
    const token = Cookies.get('admin_token');
    const res = await fetch('http://localhost:5000/api/admin/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setAdmin(data);
    setNewName(data.name);
  };

  const updateProfile = async () => {
    const token = Cookies.get('admin_token');
    const res = await fetch('http://localhost:5000/api/admin/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: newName,
        password: newPassword.length > 0 ? newPassword : undefined,
      }),
    });
    if (res.ok) {
      setMessage('Успешно обновлено!');
      fetchAdmin();
      setNewPassword('');
    } else {
      setMessage('Ошибка обновления');
    }
  };

  useEffect(() => {
    fetchAdmin();
  }, []);

  return (
    <AdminLayout>
      <div className="admin-wrapper">
        <div className="admin-container">
          <h2 className="admin-title">👤 Мой профиль</h2>

          <div className="admin-header" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '15px' }}>
            <div style={{ width: '100%' }}>
              <label>Email (не редактируется):</label>
              <input value={admin.email} disabled style={{ width: '100%', padding: '10px' }} />
            </div>
            <div style={{ width: '100%' }}>
              <label>Имя:</label>
              <input value={newName} onChange={(e) => setNewName(e.target.value)} style={{ width: '100%', padding: '10px' }} />
            </div>
            <div style={{ width: '100%' }}>
              <label>Новый пароль:</label>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} style={{ width: '100%', padding: '10px' }} />
            </div>
            <button className="admin-btn" onClick={updateProfile}>💾 Сохранить</button>
            {message && <p style={{ color: '#ccc' }}>{message}</p>}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
