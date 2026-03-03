import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import styles from './RecipesPage.module.scss'
import Text from '@/components/Text'
import heroRecipesText from '@/assets/hero-recipes.svg'
import Search from './components/Search'
import RecipeCard from '@/components/Cards/RecipeCard'
import RecipeCardSkeleton from '@/components/Cards/RecipeCard/RecipeCardSkeleton'
import Pagination from '@/components/Pagination/Pagination'
import { useRecipesSearchParams } from '@/shared/hooks/useRecipesSearchParams'
import { useStore } from '@/store/StoreContext'
import type { Option } from '@/components/MultiDropdown'

const RecipesPage = observer(() => {
  const { recipesStore: store, categoryStore } = useStore()
  const { updateQueryParams } = useRecipesSearchParams(store, categoryStore.categories)
  const { isLoading, recipes, searchQuery, selectedOptions, currentPage, totalPages } = store

  useEffect(() => {
    categoryStore.fetchCategories()
  }, [categoryStore])

  const handleSearch = (value: string) => {
    updateQueryParams({ search: value })
  }

  const handleFilter = (options: Option[]) => {
    updateQueryParams({ categories: options })
  }

  const handlePageChange = (page: number) => {
    updateQueryParams({ page })
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
          <Search
            searchValue={searchQuery}
            selectedOptions={selectedOptions}
            options={categoryStore.categories}
            onSearch={handleSearch}
            onFilter={handleFilter}
          />
        </section>
        <section className={styles.recipesSection}>
          {isLoading
            ? Array.from({ length: 12 }).map((_, i) => <RecipeCardSkeleton key={i} />)
            : store.recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}
        </section>
        {recipes.length === 0 && <div className={styles.noRecipes}>Recipes not found</div>}
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
})

export default RecipesPage
