import type { Ingradient } from './ingradients'

export interface StrapiImage {
  name: string
  formats?: {
    thumbnail?: { url: string }
    small?: { url: string }
    medium?: { url: string }
    large?: { url: string }
  }
}

export interface Equipment {
  id: number
  name: string
}
export interface Direction {
  id: number
  description: string
  image: StrapiImage
}
export interface Recipe {
  id: number
  documentId: string
  name: string
  summary: string
  images: StrapiImage[]
  totalTime: number
  cookingTime: number
  preparationTime: number
  servings: number
  rating: number
  calories: number
  likes: number
  ingradients: Ingradient[]
  equipments: Equipment[]
  directions: Direction[]
}

export interface StrapiResponse<T> {
  data: T
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}
