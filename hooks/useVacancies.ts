import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {fetchVacancies} from "@/lib/api/vacancies";
import Vacancies from "@/pages/vacancies";

export interface Vacancy {
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

interface UseVacancyParams {
    page: number;
    limit?: number;
}

export const useVacancies = ({page, limit}: UseVacancyParams) => {
    return useQuery({
        queryKey: ['vacancies', page],
        queryFn: () => fetchVacancies({page, limit: limit ?? 10}),
        retry: false,
        enabled: !!page
    });
};

export const useVacancy = (id: string) => {
    return useQuery<Vacancy>({
        queryKey: ['vacancy', id],
        queryFn: async () => {
            const {data} = await axios.get<Vacancy>(`/api/vacancies/${id}`);
            return data;
        },
        enabled: !!id,
        retry: false
    });
};
