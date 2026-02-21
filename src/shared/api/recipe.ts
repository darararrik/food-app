import { axiosInstance } from './base'
import type { Recipe, StrapiResponse } from '../types/recipe'
export const RecipeApi = {
  getRecipes: async (page = 1) => {
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
  },
  getRecipeById: async (documentId: string) => {
    const response = await axiosInstance.get<{ data: Recipe }>(`/recipes/${documentId}`, {
      params: {
        populate: ['ingradients', 'equipments', 'directions.image', 'images', 'category'],
      },
    })
    return response.data
  },
  saveRecipe: async (recipeId: string) => {
    const response = await axiosInstance.post('/favorites/add', { recipe: recipeId })
    return response.data
  },
  deleteRecipe: async (recipeId: string) => {
    const response = await axiosInstance.post(`/favorites/remove`, { recipe: recipeId })
    return response.data
  },
}
