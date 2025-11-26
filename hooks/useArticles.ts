import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {fetchArticles} from "@/lib/api/news";

export interface Article {
    id: number;
    short_ru: string;
    short_uz: string;
    short_en?: string;
    body_ru: string;
    body_uz: string;
    body_en?: string;
    img: string;
    slug_ru: string;
    slug_uz: string;
    slug_en?: string;
    created_at: string;
}

interface UseArticleParams {
    page: number;
    limit?: number;
    articleType: 'article' | 'blog'
}

export const useArticles = ({page, articleType, limit}: UseArticleParams) => {
    return useQuery({
        queryKey: ['articles_blog', page, articleType],
        queryFn: () => fetchArticles({page, articleType, limit: limit ?? 10}),
        retry: false,
        enabled: !!page
    });
};

export const useArticle = (id: string) => {
    return useQuery<Article>({
        queryKey: ['article', id],
        queryFn: async () => {
            const {data} = await axios.get<Article>(`/api/news/${id}`);
            return data;
        },
        enabled: !!id,
        retry: false
    });
};
