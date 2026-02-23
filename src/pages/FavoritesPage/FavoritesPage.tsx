import { useEffect, useState } from 'react'
import { withAuth } from '@/hoc/withAuth'
import { RecipeApi } from '@/api/recipe'
import type { Recipe } from '@/types/recipe'
import RecipeCard from '@/components/RecipeCard'
import Text from '@/components/Text'
import styles from './FavoritesPage.module.scss'

const FavoritesPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([])

  useEffect(() => {
    RecipeApi.getFavoriteRecipes(1)
      .then((r) => {
        setRecipes(r.map((favorite) => favorite.recipe))
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  if (recipes === undefined || recipes.length === 0) {
    return (
      <div className={styles.empty}>
        <Text view="title">No favorites yet</Text>
      </div>
    )
  }

  return (
    <div className={styles.favoritesPage}>
      <Text view="title">Favorites</Text>
      <section className={styles.recipesSection}>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} isFavorite />
        ))}
      </section>
    </div>
  )
}
export default withAuth(FavoritesPage)
