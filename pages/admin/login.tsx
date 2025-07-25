'use client';

import {useState, ChangeEvent, FormEvent} from 'react';
import {useRouter} from 'next/router';
import Head from 'next/head';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError('Введите email и пароль');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log(email, password);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/api/admin/login`,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
          body: JSON.stringify({email, password}),
        }
      );

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('admin', email);
        router.push('/admin/dashboard');
      } else {
        setError(data.message || 'Ошибка входа');
      }
    } catch {
      setError('Ошибка соединения с сервером');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Head>
        <title>Admin</title>
      </Head>
      <div className='admin-login-wrapper'>
        <div className='admin-login-box'>
          <h2 className='admin-login-title'>Вход в админ-панель</h2>

          {error && <div className='admin-login-error'>{error}</div>}

          <form onSubmit={handleLogin}>
            <input
              type='email'
              placeholder='Email'
              className='admin-login-input'
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
            <input
              type='password'
              placeholder='Пароль'
              className='admin-login-input'
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
            <button
              type='submit'
              className='admin-login-button'
              disabled={loading}
            >
              {loading ? 'Входим...' : 'Войти'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
