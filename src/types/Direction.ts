import type { ImageDto, Image } from './Image'

export interface DirectionDto {
  id: number
  description: string
  image: ImageDto
}

export interface Direction {
  id: number
  description: string
  image: Image
}
