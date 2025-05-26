export async function getAdmin() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DATABASE_URL}/api/admin/me`, {
      method: 'GET',
      credentials: 'include',
    });
  
    if (res.status === 200) {
      const data = await res.json();
      return data.admin;
    }
  
    return null;
  }
  