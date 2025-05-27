'use client'

import { useState, useEffect, ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  FiMenu,
  FiX,
  FiBox,
  FiMail,
  FiGrid,
  FiLayers
} from 'react-icons/fi';

interface Props {
  children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const loadCount = async () => {
      try {
        const res = await fetch('/api/requests/count');
        const data = await res.json();
        setPendingCount(data.count || 0);
      } catch {
        setPendingCount(0);
      }
    };

    loadCount();
    const interval = setInterval(loadCount, 100000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_DATABASE_URL}/api/admin/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      router.push('/admin/login');
    } catch (err) {
      console.error('Ошибка выхода', err);
    }
  };
  

  return (
    <div className={`admin-layout ${collapsed ? 'collapsed' : ''}`}>
      <aside className="admin-sidebar">
        <button className="collapse-toggle" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <FiMenu size={20} /> : <FiX size={20} />}
        </button>

        <nav className="nav-links">
          <Link href="/admin/dashboard" className={`nav-link ${router.pathname === '/admin/dashboard' ? 'active' : ''}`}>
            <span className="icon"><FiGrid /></span>
            {!collapsed && <span className="label">Панель</span>}
          </Link>

          <Link href="/admin/categories" className={`nav-link ${router.pathname === '/admin/categories' ? 'active' : ''}`}>
            <span className="icon"><FiLayers /></span>
            {!collapsed && <span className="label">Категории</span>}
          </Link>

          <Link href="/admin/products" className={`nav-link ${router.pathname === '/admin/products' ? 'active' : ''}`}>
            <span className="icon"><FiBox /></span>
            {!collapsed && <span className="label">Товары</span>}
          </Link>

          <Link href="/admin/requests" className={`nav-link ${router.pathname === '/admin/requests' ? 'active' : ''}`}>
            <span className="icon" style={{ position: 'relative' }}>
              <FiMail />
              {pendingCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: -6,
                    right: -6,
                    background: 'red',
                    color: 'white',
                    fontSize: '10px',
                    borderRadius: '50%',
                    padding: '2px 6px',
                    lineHeight: 1,
                    fontWeight: 600
                  }}
                >
                  {pendingCount}
                </span>
              )}
            </span>
            {!collapsed && <span className="label">Заявки</span>}
          </Link>
        </nav>

        <button className="logout-button" onClick={handleLogout}>
          <span className="icon"><FiX /></span>
          {!collapsed && <span className="label">Выход</span>}
        </button>
      </aside>

      <main>{children}</main>
    </div>
  );
}
