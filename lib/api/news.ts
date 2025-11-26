export const fetchArticles = async ({page = 1, articleType = 'article', limit = 10}: {
    page?: number;
    articleType: 'article' | 'blog';
    limit?: number;
}) => {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    params.set('limit', (limit ?? 10).toString());
    params.set('type', articleType);

    const baseUrl = process.env.NEXT_PUBLIC_DATABASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/news?${params.toString()}`)

    if (!res.ok) throw new Error('Failed to fetch articles');
    return res.json(); // { articles, page, limit, total }
};
