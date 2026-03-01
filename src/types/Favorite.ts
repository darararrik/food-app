import type { RecipeDto } from './Recipe'

export interface FavoriteDto {
  id: number
  documentId: string
  originalRecipeId: number
  recipe: RecipeDto
}

export interface Favorite {
  id: number
  documentId: string
  originalRecipeId: number
  recipe: RecipeDto
}
