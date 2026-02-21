import type { Recipe } from '@/shared/types/recipe'
import RecipeCard from '../RecipesPage/components/RecipeCard'
import styles from './Favorites.module.scss'
import { useEffect, useState } from 'react'
import { RecipeApi } from '@/shared/api/recipe'

const FavoritesPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  useEffect(() => {
    RecipeApi.getRecipes(1).then((r) => {
      setRecipes(r.data)
    })
  }, [])
  return (
    <div className={styles.favoritesPage}>
      <section className={styles.recipesSection}>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </section>
    </div>
  )
}
export default FavoritesPage
