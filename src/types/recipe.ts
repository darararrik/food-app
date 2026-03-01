import type { DirectionDto, Direction } from './Direction'
import type { EquipmentDto, Equipment } from './Equipment'
import type { IngredientDto, Ingredient } from './Ingredients'
import type { ImageDto, Image } from './Image'

export interface RecipeDto {
  id: number
  documentId: string
  name: string
  summary: string
  images: ImageDto[]
  totalTime: number
  cookingTime: number
  preparationTime: number
  servings: number
  rating: number
  calories: number
  likes: number
  ingradients: IngredientDto[]
  equipments: EquipmentDto[]
  directions: DirectionDto[]
}

export interface Recipe {
  id: number
  documentId: string
  name: string
  summary: string
  images: Image[]
  totalTime: number
  cookingTime: number
  preparationTime: number
  servings: number
  rating: number
  calories: number
  likes: number
  ingredients: Ingredient[]
  equipments: Equipment[]
  directions: Direction[]
}

export const toModel = (api: RecipeDto): Recipe => {
  return {
    id: api.id,
    documentId: api.documentId,
    name: api.name,
    summary: api.summary,
    images: api.images.map((image) => ({ ...image })),
    totalTime: api.totalTime,
    cookingTime: api.cookingTime,
    preparationTime: api.preparationTime,
    servings: api.servings,
    rating: api.rating,
    calories: api.calories,
    likes: api.likes,
    ingredients: api.ingradients.map((ingredient) => ({ ...ingredient })),
    equipments: api.equipments?.map((equipment) => ({ ...equipment })),
    directions: api.directions?.map((direction) => ({ ...direction })),
  }
}
