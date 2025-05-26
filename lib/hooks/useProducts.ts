import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/lib/api/products';
import axios from 'axios';

export interface Product {
  id: number;
  title_ru: string;
  title_uz: string;
  description_ru: string;
  description_uz: string;
  category_id: number;
  width_ids: number[];
  density_id: number;
  dyeing_id: number;
  composition_id: number;
  img: string;
  images: string[];
  slug: string;
  created_at: string;
  category_ids: number[];
  subcategory_ids: number[];
  density_ids: number[];
  dyeing_ids: number[];
  composition_ids: number[];
}

interface UseProductsParams {
  page: number;
  filters: Record<string, number[]>;
}

export const useProducts = ({ page, filters }: UseProductsParams) => {
  return useQuery({
    queryKey: ['products', page, filters],
    queryFn: () => fetchProducts({ page, filters }),
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
  });
};