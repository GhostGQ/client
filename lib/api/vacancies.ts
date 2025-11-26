export const fetchVacancies = async ({page = 1, limit = 10}:
                                     { page?: number; limit?: number; }) => {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    params.set('limit', limit.toString());

    const baseUrl = process.env.NEXT_PUBLIC_DATABASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/vacancies?${params.toString()}`)

    if (!res.ok) throw new Error('Failed to fetch vacancies');
    return res.json(); // { products, page, limit, total }
};
