import type { Recipe } from '@/shared/types/recipe'
import Infotext from '../InfoText'
import styles from './HeroImage.module.scss'
type HeroImageProps = {
  recipe: Recipe
}
const HeroImage: React.FC<HeroImageProps> = ({ recipe }) => {
  const recipeImage =
    recipe.images[0]?.formats?.large?.url || recipe.images[0]?.formats?.medium?.url
  return (
    <div className={styles.imageContainer}>
      <img src={recipeImage} alt={recipe.name} className={styles.heroImage} />
      <div className={styles.infoContainer}>
        <Infotext title="Preparation" data={`${recipe.preparationTime} minutes`} />
        <Infotext title="Cooking" data={`${recipe.cookingTime} minutes`} />
        <Infotext title="Total" data={`${recipe.totalTime} minutes`} />
        <Infotext title="Likes" data={recipe.likes.toString()} />
        <Infotext title="Servings" data={`${recipe.servings} servings`} />
        <Infotext title="Rating" data={`${recipe.rating} / 5`} />
      </div>
    </div>
  )
}

export default HeroImage
