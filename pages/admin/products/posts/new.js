import { useState } from 'react';
import AdminLayout from '../../../components/AdminLayout';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Cookies from 'js-cookie';
import '../../../styles/posts.css';

const RichTextEditor = dynamic(() => import('../../../components/RichTextEditor'), { ssr: false });

export default function NewPost() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [type, setType] = useState('news');
  const [content, setContent] = useState('');

  const handleSave = async () => {
    const token = Cookies.get('admin_token');
    const res = await fetch('http://localhost:5000/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ title, type, content })
    });

    if (res.ok) {
      router.push('/admin/posts');
    }
  };

  return (
    <AdminLayout>
      <div className="post-editor">
        <h2>➕ Новый пост</h2>

        <input
          type="text"
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="news">Новость</option>
          <option value="blog">Блог</option>
        </select>

        <RichTextEditor value={content} onChange={setContent} />

        <button className="save-btn" onClick={handleSave}>💾 Сохранить</button>
      </div>
    </AdminLayout>
  );
}
