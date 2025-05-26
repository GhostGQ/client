import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import useAdminAuth from '@/hooks/useAdminAuth';
import styles from '@/styles/admin-products.module.css';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';

const COLORS = ['#FFA500', '#28a745', '#dc3545'];

export default function Dashboard() {
  useAdminAuth();
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch('/api/dashboard/stats')
      .then(res => res.json())
      .then(setStats);
  }, []);

  if (!stats) return <p style={{ padding: 32, color: '#fff', background: '#121212' }}>Загрузка...</p>;

  const requestChartData = [
    { name: 'Новые', value: stats.requests.pending },
    { name: 'Одобренные', value: stats.requests.approved },
    { name: 'Отклонённые', value: stats.requests.rejected },
  ];

  return (
    <AdminLayout>
      <div className={styles.page}>
        <h1 style={{ marginBottom: 20 }}>📊 Панель управления</h1>

        {/* Карточки */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: 32 }}>
          <div style={cardStyle}>
            <h3>🛒 Всего товаров</h3>
            <p style={countStyle}>{stats.products}</p>
          </div>
          <div style={cardStyle}>
            <h3>📨 Новых заявок</h3>
            <p style={{ ...countStyle, color: '#FFA500' }}>{stats.requests.pending}</p>
          </div>
          <div style={cardStyle}>
            <h3>✅ Одобренных</h3>
            <p style={{ ...countStyle, color: '#28a745' }}>{stats.requests.approved}</p>
          </div>
          <div style={cardStyle}>
            <h3>❌ Отклонённых</h3>
            <p style={{ ...countStyle, color: '#dc3545' }}>{stats.requests.rejected}</p>
          </div>
        </div>

        {/* Графики */}
        <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 300px', minWidth: 300 }}>
            <h3 style={{ textAlign: 'center' }}>Заявки (Pie Chart)</h3>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={requestChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {requestChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div style={{ flex: '1 1 300px', minWidth: 300 }}>
            <h3 style={{ textAlign: 'center' }}>Заявки (Bar Chart)</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={requestChartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value">
                  {requestChartData.map((entry, index) => (
                    <Cell key={`bar-${index}`} fill={COLORS[index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

const cardStyle = {
  background: '#1e1e1e',
  padding: '20px',
  borderRadius: '12px',
  boxShadow: '0 0 8px rgba(0,0,0,0.3)',
  color: '#fff'
};

const countStyle = {
  fontSize: '2.2rem',
  fontWeight: 'bold',
  marginTop: '12px'
};
