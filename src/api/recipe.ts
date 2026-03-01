import { axiosInstance } from './base'
import type { RecipeDto } from '../types/Recipe'
import type { StrapiResponse } from '@/types/StrapiResponse'
import type { FavoriteDto } from '@/types/Favorite'
export const RecipeApi = {
  getRecipes: async (page = 1, search = '', categories: string[] = []) => {
    const params: any = {
      populate: ['images', 'ingradients', 'category'],
      pagination: {
        page,
        pageSize: 12,
      },
    }

    if (search) {
      params.filters = {
        ...params.filters,
        name: {
          $containsi: search,
        },
      }
    }

    if (categories.length > 0) {
      params.filters = {
        ...params.filters,
        category: {
          id: {
            $in: categories.map(Number),
          },
        },
      }
    }

    const response = await axiosInstance.get<StrapiResponse<RecipeDto[]>>('/recipes', {
      params,
    })
    return response.data
  },
  getFavoriteRecipes: async (page = 1) => {
    try {
      const res = await axiosInstance.get<FavoriteDto[]>('/favorites', {
        params: {
          populate: ['recipe'],
          pagination: {
            page,
            pageSize: 12,
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
    const response = await axiosInstance.get<{ data: RecipeDto }>(`/recipes/${documentId}`, {
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
    const response = await axiosInstance.get<StrapiResponse<RecipeDto[]>>('/recipes', {
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
