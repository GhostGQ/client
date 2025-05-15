import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import AdminLayout from '../../components/AdminLayout';
import Cookies from 'js-cookie';
import '../../styles/posts.css';

interface IPost {
  id: number;
  title: string;
  type: string;
  archived: boolean;
  created_at: string;
}

export default function AdminPosts() {
  const router = useRouter();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [filterType, setFilterType] = useState('');
  const [search, setSearch] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);

  const fetchPosts = async () => {
    const res = await fetch('http://localhost:5000/api/posts');
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(
    p =>
      (!filterType || p.type === filterType) &&
      (!search || p.title.toLowerCase().includes(search.toLowerCase()))
  );

  const handleDelete = async (id: number) => {
    if (!confirm('Удалить пост?')) return;
    const token = Cookies.get('admin_token');
    await fetch(`http://localhost:5000/api/posts/${id}`, {
      method: 'DELETE',
      headers: {Authorization: `Bearer ${token}`},
    });
    fetchPosts();
  };

  const handleArchive = async (id: number) => {
    const token = Cookies.get('admin_token');
    await fetch(`http://localhost:5000/api/posts/${id}/archive`, {
      method: 'PATCH',
      headers: {Authorization: `Bearer ${token}`},
    });
    fetchPosts();
  };

  return (
    <AdminLayout>
      <div className='posts-wrapper'>
        <div className='posts-header'>
          <h2>📰 Все посты</h2>
          <button onClick={() => router.push('/admin/posts/new')}>
            ➕ Новый пост
          </button>
        </div>

        <div className='posts-filters'>
          <input
            type='text'
            placeholder='Поиск по заголовку...'
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
          >
            <option value=''>Все типы</option>
            <option value='news'>Новости</option>
            <option value='blog'>Блог</option>
          </select>
        </div>

        <div className='posts-table'>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Заголовок</th>
                <th>Тип</th>
                <th>Статус</th>
                <th>Дата</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map(post => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                  <td>{post.type === 'news' ? 'Новость' : 'Блог'}</td>
                  <td>{post.archived ? '🗃️ Архив' : '🟢 Активный'}</td>
                  <td>{new Date(post.created_at).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() =>
                        router.push(`/admin/posts/edit/${post.id}`)
                      }
                    >
                      ✏️
                    </button>
                    <button onClick={() => handleDelete(post.id)}>🗑️</button>
                    <button onClick={() => handleArchive(post.id)}>📦</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredPosts.length === 0 && (
            <p className='empty-msg'>Нет постов</p>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
