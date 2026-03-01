import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { withAuth } from '@/hoc/withAuth'
import { useStore } from '@/store/StoreContext'
import RecipeCard from '@/components/Cards/RecipeCard'
import Text from '@/components/Text'
import styles from './FavoritesPage.module.scss'
import RecipeCardSkeleton from '@/components/Cards/RecipeCard/RecipeCardSkeleton'

const FavoritesPage = observer(() => {
  const { favorite: favoriteStore } = useStore()

  useEffect(() => {
    favoriteStore.fetchFavorites()
  }, [favoriteStore])

  if (favoriteStore.favorites === undefined || favoriteStore.favorites.length === 0) {
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
        {favoriteStore.isLoading
          ? Array.from({ length: 12 }).map((_, i) => <RecipeCardSkeleton key={i} />)
          : favoriteStore.favorites.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}
      </section>
    </div>
  )
})
export default withAuth(FavoritesPage)
