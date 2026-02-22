import Button from '@/components/Button'
import Card from '@/components/Card'
import { RecipeApi } from '@/shared/api/recipe'
import type { Recipe } from '@/shared/types/recipe'
import { useState } from 'react'
import { NavLink } from 'react-router'

export type RecipeCardProps = {
  recipe: Recipe
  isFavorite?: boolean
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, isFavorite = false }) => {
  const [isFav, setIsFavorite] = useState(isFavorite)
  const formats = recipe.images?.[0]?.formats
  const imageUrl =
    formats?.medium?.url ||
    formats?.small?.url ||
    formats?.large?.url ||
    formats?.thumbnail?.url ||
    ''

  return (
    <NavLink to={`/recipes/${recipe.documentId}`}>
      <Card
        title={recipe.name}
        subtitle={recipe.ingradients?.map((i) => i.name).join(' + ') || ''}
        image={imageUrl}
        captionSlot={recipe.totalTime}
        actionSlot={
          <Button
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              if (isFav) {
                RecipeApi.deleteRecipe(recipe.documentId).then((r) => {
                  console.log(r)
                  setIsFavorite(false)
                })
              } else {
                RecipeApi.saveRecipe(recipe.documentId).then((r) => {
                  console.log(r)
                  setIsFavorite(true)
                })
              }
            }}
          >
            {isFav ? 'Remove' : 'Save'}
          </Button>
        }
        contentSlot={`${recipe.calories} kcal`}
      />
    </NavLink>
  )
}
export default RecipeCard
