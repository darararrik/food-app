import { axiosInstance } from './base'
import type { StrapiResponse } from '@/types/StrapiResponse'

export interface CategoryDto {
  id: number
  documentId: string
  title: string
}

export const CategoryApi = {
  getCategories: async () => {
    const response = await axiosInstance.get<StrapiResponse<CategoryDto[]>>('/meal-categories', {
      params: {
        populate: '*',
      },
    })
    return response.data
  },
}
