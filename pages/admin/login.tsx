import {useState} from 'react';
import Cookies from 'js-cookie';
import {useRouter} from 'next/router';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password}),
      });

      const data = await res.json();

      if (res.ok) {
        Cookies.set('admin_token', data.token, {expires: 1});
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Ошибка логина');
      }
    } catch {
      setError('Сервер недоступен');
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>🔐 Admin Panel Login</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type='email'
            placeholder='Email'
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
            style={styles.input}
          />
          <input
            type='password'
            placeholder='Пароль'
            value={password}
            required
            onChange={e => setPassword(e.target.value)}
            style={styles.input}
          />
          <button type='submit' style={styles.button}>
            Войти
          </button>
          {error && <p style={styles.error}>{error}</p>}
        </form>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    display: 'grid',
    placeItems: 'center',
    background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
  },
  card: {
    backdropFilter: 'blur(16px)',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 0 30px rgba(0, 255, 255, 0.3)',
    width: '100%',
    maxWidth: '400px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: '#fff',
  },
  title: {
    marginBottom: '20px',
    textAlign: 'center' as const,
    fontWeight: 'bold',
    fontSize: '24px',
    color: '#00ffe7',
    textShadow: '0 0 10px #00ffe7',
  },
  form: {
    display: 'grid',
    gap: '15px',
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#fff',
    outline: 'none',
  },
  button: {
    padding: '12px',
    borderRadius: '8px',
    background: '#00ffe7',
    color: '#000',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
    textShadow: '0 0 5px #00ffe7',
    transition: '0.3s',
  },
  error: {
    marginTop: '10px',
    color: 'salmon',
    textAlign: 'center' as const,
  },
};
