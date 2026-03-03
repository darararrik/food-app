import Button from '@/components/Button'
import type { Recipe } from '@/types/models/Recipe'
import { observer } from 'mobx-react-lite'
import { NavLink } from 'react-router'
import TimerIcon from '@/components/icons/TimerIcon'
import React from 'react'
import { useStore } from '@/store/StoreContext'
import Card from '../Card'

export type RecipeCardProps = {
  recipe: Recipe
  isFavorite?: boolean
}

const RecipeCard: React.FC<RecipeCardProps> = observer(({ recipe }) => {
  const { favoriteStore: favoriteStore } = useStore()
  const isFav = favoriteStore.isFavorite(recipe.documentId)
  const formats = recipe.images?.[0]?.formats
  const imageUrl =
    formats?.medium?.url ||
    formats?.small?.url ||
    formats?.large?.url ||
    formats?.thumbnail?.url ||
    ''

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    favoriteStore.toggleFavorite(recipe.documentId)
  }

  return (
    <NavLink to={`/recipes/${recipe.documentId}`}>
      <Card
        title={recipe.name}
        subtitle={recipe.ingredients?.map((i) => i.name).join(' + ') || ''}
        image={imageUrl}
        captionSlot={
          <React.Fragment>
            <TimerIcon />
            {`${recipe.cookingTime} minutes`}
          </React.Fragment>
        }
        actionSlot={<Button onClick={handleFavoriteClick}>{isFav ? 'Remove' : 'Save'}</Button>}
        contentSlot={`${recipe.calories} kcal`}
      />
    </NavLink>
  )
})
export default RecipeCard
