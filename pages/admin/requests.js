import { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import '../../styles/requests.css';
import Cookies from 'js-cookie';

export default function AdminRequests() {
  const [requests, setRequests] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [statusUpdate, setStatusUpdate] = useState('');

  const fetchRequests = async () => {
    const res = await fetch('http://localhost:5000/api/requests');
    const data = await res.json();
    setRequests(data);
    setFiltered(data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    let filteredData = [...requests];

    if (search) {
      filteredData = filteredData.filter((r) =>
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.phone.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter) {
      filteredData = filteredData.filter((r) => r.status === statusFilter);
    }

    if (dateFilter) {
      filteredData = filteredData.filter((r) =>
        new Date(r.created_at).toISOString().slice(0, 10) === dateFilter
      );
    }

    setFiltered(filteredData);
  }, [search, statusFilter, dateFilter, requests]);

  const statusMap = {
    pending: { text: 'В ожидании', color: '#ff9800' },
    approved: { text: 'Одобрено', color: '#4caf50' },
    rejected: { text: 'Отклонено', color: '#f44336' },
  };

  const handleStatusChange = async () => {
    if (!statusUpdate) return;
    const token = Cookies.get('admin_token');

    const res = await fetch(`http://localhost:5000/api/requests/${selectedRequest.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: statusUpdate }),
    });

    if (res.ok) {
      fetchRequests();
      setSelectedRequest(null);
      setStatusUpdate('');
    }
  };

  return (
    <AdminLayout>
      <div className="requests-wrapper">
        <div className="requests-container">
          <h2>📨 Все заявки</h2>

          <div className="filters-bar">
            <input
              type="text"
              placeholder="Поиск по имени или телефону..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">Все статусы</option>
              <option value="pending">⏳ В ожидании</option>
              <option value="approved">✅ Одобрено</option>
              <option value="rejected">❌ Отклонено</option>
            </select>

            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />

            <button onClick={() => {
              setSearch('');
              setStatusFilter('');
              setDateFilter('');
            }}>Сбросить</button>
          </div>

          <div className="requests-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Имя</th>
                  <th>Телефон</th>
                  <th>Комментарий</th>
                  <th>Дата</th>
                  <th>Продукт</th>
                  <th>Статус</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.name}</td>
                    <td>{r.phone}</td>
                    <td>{r.comment}</td>
                    <td>{new Date(r.created_at).toLocaleDateString()}</td>
                    <td>{r.product_title}</td>
                    <td>
                      <span style={{
                        background: statusMap[r.status].color,
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        color: '#fff'
                      }}>
                        {statusMap[r.status].text}
                      </span>
                    </td>
                    <td>
                      <button onClick={() => {
                        setSelectedRequest(r);
                        setStatusUpdate(r.status);
                      }}>
                        <i className="fas fa-eye"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <p className="empty-msg">Нет заявок</p>}
          </div>
        </div>
      </div>

      {/* Модалка просмотра заявки (альбомная) */}
      {selectedRequest && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-left">
              <h3>Заявка №{selectedRequest.id}</h3>
              <p><b>Имя:</b> {selectedRequest.name}</p>
              <p><b>Телефон:</b> {selectedRequest.phone}</p>
              <p><b>Комментарий:</b> {selectedRequest.comment || '—'}</p>
              <p><b>Дата:</b> {new Date(selectedRequest.created_at).toLocaleString()}</p>

              <div style={{ marginTop: '12px' }}>
                <label>Изменить статус:</label><br />
                <select value={statusUpdate} onChange={(e) => setStatusUpdate(e.target.value)} style={{ marginTop: 6 }}>
                  <option value="pending">В ожидании</option>
                  <option value="approved">Одобрено</option>
                  <option value="rejected">Отклонено</option>
                </select>
              </div>
            </div>

            <div className="modal-right">
              <h4>Информация о товаре</h4>
              <p><b>Название:</b> {selectedRequest.product_title || '—'}</p>
              <p><b>Категория:</b> {selectedRequest.category || '—'}</p>
              <p><b>Материал:</b> {selectedRequest.material_type || '—'}</p>
              <p><b>Состав:</b> {selectedRequest.material_spec || '—'}</p>
            </div>

            <div className="modal-actions">
              <button onClick={handleStatusChange}>💾 Сохранить</button>
              <button onClick={() => setSelectedRequest(null)}>Закрыть</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
