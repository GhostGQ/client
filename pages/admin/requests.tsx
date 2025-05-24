import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import styles from '@/styles/admin-products.module.css';

export default function RequestsPage() {
  const [requests, setRequests] = useState([]);
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (search) params.append('search', search);
    if (dateFrom) params.append('from', dateFrom);
    if (dateTo) params.append('to', dateTo);

    const res = await fetch(`/api/requests?${params.toString()}`);
    const data = await res.json();
    setRequests(data.requests || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, [status, search, dateFrom, dateTo]);

  const updateStatus = async (id: string, newStatus: string) => {
    const res = await fetch(`/api/requests/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) fetchRequests();
  };

  return (
    <AdminLayout>
      <div className={styles.page}>
        <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>📨 Заявки от клиентов</h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          background: '#1f1f1f',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '24px',
          boxShadow: '0 0 10px rgba(0,0,0,0.3)'
        }}>
          <div>
            <label className={styles.label}>Статус</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className={styles.input}>
              <option value="">Все</option>
              <option value="pending">Новые</option>
              <option value="approved">Одобренные</option>
              <option value="rejected">Отклонённые</option>
            </select>
          </div>
          <div>
            <label className={styles.label}>Поиск (имя или номер)</label>
            <input
              type="text"
              value={search}
              placeholder="Введите текст..."
              onChange={(e) => setSearch(e.target.value)}
              className={styles.input}
            />
          </div>
          <div>
            <label className={styles.label}>Дата от</label>
            <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className={styles.input} />
          </div>
          <div>
            <label className={styles.label}>Дата до</label>
            <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className={styles.input} />
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Имя</th>
                <th>Телефон</th>
                <th>Комментарий</th>
                <th>Статус</th>
                <th>Дата</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6}>Загрузка...</td></tr>
              ) : requests.length === 0 ? (
                <tr><td colSpan={6}>Нет заявок</td></tr>
              ) : (
                requests.map((r: any) => (
                  <tr key={r.id}>
                    <td>{r.name}</td>
                    <td>{r.phone}</td>
                    <td>{r.comment || '—'}</td>
                    <td>
                      {r.status === 'pending' ? (
                        <span style={{ color: 'red', fontWeight: 'bold' }}>⏳ В ожидании</span>
                      ) : r.status === 'approved' ? (
                        <span style={{ color: 'limegreen' }}>✅ Одобрено</span>
                      ) : (
                        <span style={{ color: 'gray' }}>❌ Отклонено</span>
                      )}
                    </td>
                    <td>{new Date(r.created_at).toLocaleString()}</td>
                    <td>
                      <select
                        value={r.status}
                        onChange={(e) => updateStatus(r.id, e.target.value)}
                        className={styles.input}
                      >
                        <option value="pending">В ожидании</option>
                        <option value="approved">Одобрено</option>
                        <option value="rejected">Отклонено</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
