import { axiosInstance } from './base'
import { toModel, type RecipeDto } from '@/types/dto/RecipeDto'
import type { FavoriteDto } from '@/types/dto/FavoriteDto'
import type { StrapiResponse } from '@/types/StrapiResponse'
import type { Recipe } from '@/types/models/Recipe'

export const RecipeApi = {
  getRecipes: async (
    page = 1,
    search = '',
    categories: string[] = [],
  ): Promise<StrapiResponse<Recipe[]>> => {
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

    const response = await axiosInstance.get<StrapiResponse<RecipeDto[]>>('/recipes', { params })
    return {
      data: response.data.data.map(toModel),
      meta: response.data.meta,
    }
  },

  getFavoriteRecipes: async (page = 1): Promise<Recipe[]> => {
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
            const recipeData = await RecipeApi.getRecipeById(fav.recipe.documentId)
            return recipeData
          }
          return null
        })

        const results = await Promise.all(promises)
        return results.filter((r): r is Recipe => r !== null)
      }

      return []
    } catch (error) {
      console.error(error)
      return []
    }
  },

  getRecipeById: async (documentId: string): Promise<Recipe> => {
    const response = await axiosInstance.get<{ data: RecipeDto }>(`/recipes/${documentId}`, {
      params: {
        populate: ['ingradients', 'equipments', 'directions.image', 'images', 'category'],
      },
    })
    return toModel(response.data.data)
  },

  saveRecipe: async (recipeId: string) => {
    const response = await axiosInstance.post('/favorites/add', { recipe: recipeId })
    return response.data
  },

  deleteRecipe: async (recipeId: string) => {
    const response = await axiosInstance.post(`/favorites/remove`, { recipe: recipeId })
    return response.data
  },

  findRecipeByName: async (name: string): Promise<StrapiResponse<Recipe[]>> => {
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
    return {
      data: response.data.data.map(toModel),
      meta: response.data.meta,
    }
  },
}
