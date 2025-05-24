export async function getAdmin() {
    const res = await fetch('http://localhost:5000/api/admin/me', {
      method: 'GET',
      credentials: 'include',
    });
  
    if (res.status === 200) {
      const data = await res.json();
      return data.admin;
    }
  
    return null;
  }
  