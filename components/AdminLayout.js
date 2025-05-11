import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Head from 'next/head';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [newRequestCount, setNewRequestCount] = useState(0);

  useEffect(() => {
    const token = Cookies.get('admin_token');
    if (!token) router.push('/admin/login');
  }, []);

  const fetchNewCount = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/requests/new/count');
      const data = await res.json();
      setNewRequestCount(data.count || 0);
    } catch (err) {
      console.error('Ошибка при получении количества новых заявок:', err);
    }
  };

  useEffect(() => {
    fetchNewCount();
    const interval = setInterval(fetchNewCount, 30000); // каждые 30 секунд
    return () => clearInterval(interval);
  }, []);

  const logout = () => {
    Cookies.remove('admin_token');
    router.push('/admin/login');
  };

  const links = [
    { title: 'Товары', icon: 'fa-box', path: '/admin/products', color: '#ff8a65' },
    { title: 'Заявки', icon: 'fa-inbox', path: '/admin/requests', color: '#4fc3f7', showBadge: true },
    { title: 'Блог', icon: 'fa-newspaper', path: '/admin/posts?type=blog', color: '#81c784' },
    { title: 'Новости', icon: 'fa-bullhorn', path: '/admin/posts?type=news', color: '#9575cd' },
  ];

  const profileLink = { title: 'Профиль', icon: 'fa-user-cog', path: '/admin/profile', color: '#fbc02d' };

  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free/css/all.min.css" />
      </Head>

      <div style={styles.layout}>
        <aside style={{ ...styles.sidebar, width: sidebarOpen ? '200px' : '60px' }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={styles.toggleBtn}>
            <i className="fas fa-bars"></i>
          </button>

          <div style={styles.topLinks}>
            {links.map((link, idx) => {
              const isActive = router.pathname === link.path || router.asPath.startsWith(link.path);
              return (
                <div
                  key={idx}
                  onClick={() => router.push(link.path)}
                  style={{
                    ...styles.navItem,
                    background: isActive ? link.color : 'transparent',
                    color: isActive ? '#fff' : '#ccc',
                    position: 'relative',
                  }}
                  title={link.title}
                >
                  <i className={`fas ${link.icon}`} style={{ fontSize: '14px' }}></i>
                  {sidebarOpen && <span>{link.title}</span>}
                  {link.showBadge && newRequestCount > 0 && (
                    <span style={styles.badge}>
                      {newRequestCount}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div style={styles.bottomLinks}>
            <div
              onClick={() => router.push(profileLink.path)}
              style={{
                ...styles.navItem,
                background: router.pathname === profileLink.path ? profileLink.color : 'transparent',
                color: router.pathname === profileLink.path ? '#000' : '#ccc',
              }}
              title="Профиль"
            >
              <i className={`fas ${profileLink.icon}`}></i>
              {sidebarOpen && <span>{profileLink.title}</span>}
            </div>

            <div
              onClick={logout}
              style={{
                ...styles.navItem,
                background: '#e53935',
                color: '#fff',
              }}
              title="Выход"
            >
              <i className="fas fa-sign-out-alt"></i>
              {sidebarOpen && <span>Выход</span>}
            </div>
          </div>
        </aside>

        <main style={styles.main}>{children}</main>
      </div>
    </>
  );
}

const styles = {
  layout: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: 'Segoe UI, sans-serif',
    background: '#1e1e2f',
  },
  sidebar: {
    background: '#2a2a3c',
    borderRight: '1px solid #444',
    padding: '20px 10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'width 0.3s ease',
  },
  toggleBtn: {
    background: 'none',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    marginBottom: '20px',
    color: '#ccc',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 12px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginBottom: '8px',
  },
  badge: {
    background: '#f44336',
    borderRadius: '12px',
    padding: '2px 8px',
    fontSize: '11px',
    color: '#fff',
    position: 'absolute',
    right: '10px',
    top: '8px',
  },
  topLinks: {
    display: 'flex',
    flexDirection: 'column',
  },
  bottomLinks: {
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flex: 1,
    padding: '40px',
    color: '#fff',
  }
};
