import { useEffect } from 'react'
import { useSearchParams } from 'react-router'
import { RecipesStore } from '@/store/RecipeStore/RecipeStore'
import type { Option } from '@/components/MultiDropdown'

export const useRecipesSearchParams = (store: RecipesStore) => {
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const query = searchParams.get('search') || ''
    const page = parseInt(searchParams.get('page') || '1', 10)
    const categoriesParams = searchParams.get('categories')
    const selectedCategories = categoriesParams
      ? categoriesParams.split(',').map((key) => {
          const cat = store.categories.find((c) => c.key === key)
          return { key, value: cat ? cat.value : key }
        })
      : []

    store.setSearchQuery(query)
    store.setCurrentPage(page)
    store.setSelectedOptions(selectedCategories)

    store.fetchRecipes()
  }, [searchParams, store, store.categories])

  const updateQueryParams = (params: { search?: string; page?: number; categories?: Option[] }) => {
    const newParams = new URLSearchParams(searchParams)

    if (params.search !== undefined) {
      if (params.search) newParams.set('search', params.search)
      else newParams.delete('search')
      newParams.set('page', '1')
    }

    if (params.page !== undefined) {
      newParams.set('page', params.page.toString())
    }

    if (params.categories !== undefined) {
      if (params.categories.length > 0) {
        newParams.set('categories', params.categories.map((o) => o.key).join(','))
      } else {
        newParams.delete('categories')
      }
      newParams.set('page', '1')
    }

    setSearchParams(newParams)
  }

  return { updateQueryParams }
}
