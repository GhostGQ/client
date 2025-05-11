import AdminLayout from '../../components/AdminLayout';

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="admin-wrapper">
        <div className="admin-container">
          <h2 className="admin-title">👋 Добро пожаловать в админку</h2>
          <p className="empty-msg">Выберите раздел в меню слева</p>
        </div>
      </div>
    </AdminLayout>
  );
}
