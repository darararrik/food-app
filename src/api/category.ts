import { axiosInstance } from './base'
import type { StrapiResponse } from '@/types/StrapiResponse'
import type { CategoryDto } from '@/types/dto/CategoryDto'

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
