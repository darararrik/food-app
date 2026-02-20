import { useEffect, useState } from 'react'
import { getRecipes } from '@/shared/api/recipe'
import type { Recipe } from '@/shared/types/recipe'
import styles from './RecipesPage.module.scss'
import Text from '@/components/Text'
import heroRecipesText from '@/assets/hero-recipes.svg'
import Search from './components/Search'
import RecipeCard from './components/RecipeCard'
import Pagination from '@/components/Pagination/Pagination'

const RecipesPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    getRecipes(currentPage)
      .then((response) => {
        setRecipes(response.data)
        setTotalPages(response.meta.pagination.pageCount)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={styles.recipesPage}>
      <section className={styles.hero}>
        <div className={styles.heroOverlay}>
          <img src={heroRecipesText} alt="Recipes" className={styles.heroTitleImage} />
        </div>
      </section>
      <div className={styles.content}>
        <section className={styles.descriptionSection}>
          <div className={styles.container}>
            <Text view="p-20" className={styles.descriptionText}>
              Find the perfect food and <span className={styles.highlight}>drink ideas</span> for
              every occasion, from <span className={styles.highlight}>weeknight dinners</span> to{' '}
              <span className={styles.highlight}>holiday feasts</span>.
            </Text>
          </div>
        </section>
        <section className={styles.searchSection}>
          <Search></Search>
        </section>
        <section className={styles.recipesSection}>
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </section>
      </div>
      <section className={styles.paginationSection}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </section>
    </div>
  )
}

export default RecipesPage
