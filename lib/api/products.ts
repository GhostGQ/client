
export const fetchProducts = async ({
  page = 1,
  filters,
  limit = 10
}: {
  page?: number;
  filters?: Record<string, number[]>;
  limit?: number;
}) => {
  const params = new URLSearchParams();
  params.set('page', page.toString());
  params.set('limit', limit.toString());

  if (filters) {
    Object.entries(filters).forEach(([key, values]) => {
      values.forEach(val => params.append(`${key}`, val.toString()));
    });
  }

  const baseUrl = process.env.NEXT_PUBLIC_DATABASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/products?${params.toString()}`)

  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json(); // { products, page, limit, total }
};
