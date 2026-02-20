import Button from '@/components/Button'
import Card from '@/components/Card'
import type { Recipe } from '@/shared/types/recipe'
import { NavLink } from 'react-router'

export type RecipeCardProps = {
  recipe: Recipe
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
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
        actionSlot={<Button>Save</Button>}
        contentSlot={`${recipe.calories} kcal`}
      />
    </NavLink>
  )
}
export default RecipeCard
