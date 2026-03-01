import { axiosInstance } from './base'
import type { Favorite, Recipe, StrapiResponse } from '../types/recipe'
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
  getFavoriteRecipes: async (page = 1) => {
    try {
      const res = await axiosInstance.get<Favorite[]>('/favorites', {
        params: {
          populate: ['recipe'],
          pagination: {
            page,
            pageSize: 10,
          },
        },
      })

      const favorites = res.data

      if (favorites && favorites.length > 0) {
        const promises = favorites.map(async (fav) => {
          if (fav.recipe?.documentId) {
            const recipeInfo = await RecipeApi.getRecipeById(fav.recipe.documentId)
            fav.recipe = recipeInfo.data
          }
          return fav
        })

        await Promise.all(promises)
      }

      return favorites
    } catch (error) {
      console.error(error)
      return []
    }
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
  findRecipeByName: async (name: string) => {
    const response = await axiosInstance.get<StrapiResponse<Recipe[]>>('/recipes', {
      params: {
        populate: ['ingradients', 'equipments', 'directions.image', 'images', 'category'],
        filters: {
          name: {
            $containsi: name,
          },
        },
      },
    })
    return response.data
  },
}
