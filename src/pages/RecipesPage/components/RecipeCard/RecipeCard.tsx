import Button from '@/components/Button'
import Card from '@/components/Card'
import type { Recipe } from '@/shared/types/recipe'

export type RecipeCardProps = {
  recipe: Recipe
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const imageUrl = recipe.images?.[0]?.formats?.medium?.url || ''

  return (
    <Card
      title={recipe.name}
      subtitle={recipe.ingradients?.map((i) => i.name).join(' + ') || ''}
      image={imageUrl}
      captionSlot={recipe.totalTime}
      actionSlot={<Button>Save</Button>}
      contentSlot={`${recipe.calories} kcal`}
    />
  )
}
export default RecipeCard
