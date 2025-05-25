import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function useAdminAuth() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/admin/me', {
          method: 'GET',
          credentials: 'include',
        });

        if (res.status !== 200) {
          router.push('/admin/login');
        }
      } catch {
        router.push('/admin/login');
      }
    };

    checkAuth();
  }, []);
}
