import Button from '@/components/Button'
import Card from '@/components/Card'
import { RecipeApi } from '@/api/recipe'
import type { Recipe } from '@/types/recipe'
import { useCallback, useState } from 'react'
import { NavLink } from 'react-router'
import TimerIcon from '../icons/TimerIcon'
import React from 'react'

export type RecipeCardProps = {
  recipe: Recipe
  isFavorite?: boolean
}

const RecipeCard: React.FC<RecipeCardProps> = React.memo(({ recipe, isFavorite = false }) => {
  const [isFav, setIsFavorite] = useState(isFavorite)
  const formats = recipe.images?.[0]?.formats
  const imageUrl =
    formats?.medium?.url ||
    formats?.small?.url ||
    formats?.large?.url ||
    formats?.thumbnail?.url ||
    ''
  const handleFavoriteClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      e.preventDefault()

      const apiCall = isFav
        ? RecipeApi.deleteRecipe(recipe.documentId)
        : RecipeApi.saveRecipe(recipe.documentId)

      apiCall
        .then(() => {
          setIsFavorite((prev) => !prev)
        })
        .catch((err) => console.error(err))
    },
    [isFav, recipe.documentId],
  )
  return (
    <NavLink to={`/recipes/${recipe.documentId}`}>
      <Card
        title={recipe.name}
        subtitle={recipe.ingradients?.map((i) => i.name).join(' + ') || ''}
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
