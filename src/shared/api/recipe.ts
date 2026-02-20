import { axiosInstance } from './base'
import type { Recipe, StrapiResponse } from '../types/recipe'

export const getRecipes = async (page = 1) => {
  const response = await axiosInstance.get<StrapiResponse<Recipe[]>>('/recipes', {
    params: {
      populate: ['images', 'ingradients'],
      pagination: {
        page,
        pageSize: 10,
      },
    },
  })
  return response.data
}

export const getRecipeById = async (documentId: string) => {
  const response = await axiosInstance.get<{ data: Recipe }>(`/recipes/${documentId}`, {
    params: {
      populate: ['ingradients', 'equipments', 'directions.image', 'images', 'category'],
    },
  })
  return response.data
}
