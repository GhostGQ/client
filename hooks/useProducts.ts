import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/lib/api/products';
import axios from 'axios';

export interface Product {
  product: {
    id: number;
    title_ru: string;
    title_uz: string;
    description_ru: string;
    description_uz: string;
    img: string;
    images: string[];
    slug: string;
    created_at: string;
    category_ids: number[];
    width_ids: number[];
    density_ids: number[];
    dyeing_ids: number[];
    composition_ids: number[];

    categorys: [{
      id: number;
      name_ru: string;
      name_uz: string;
    }];
    widths: [{
      id: number;
      name_ru: string;
      name_uz: string;
    }];
    densitys: [{
      id: number;
      name_ru: string;
      name_uz: string;
    }];
    dyeings: [{
      id: number;
      name_ru: string;
      name_uz: string;
    }];
    compositions: [{
      id: number;
      name_ru: string;
      name_uz: string;
    }];
  }
}

interface UseProductsParams {
  page: number;
  filters: Record<string, number[]>;
  limit?: number;
}

export const useProducts = ({ page, filters, limit }: UseProductsParams) => {
  return useQuery({
    queryKey: ['products', page, filters],
    queryFn: () => fetchProducts({ page, filters, limit }),
    retry: false
  });
};

export const useProduct = (id: string) => {
  return useQuery<Product>({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data } = await axios.get<Product>(`/api/products/${id}`);
      return data;
    },
    enabled: !!id,
    retry: false
  });
};