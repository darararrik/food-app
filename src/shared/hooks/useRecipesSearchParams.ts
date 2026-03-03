import { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router'
import { RecipeStore } from '@/store/RecipeStore/RecipeStore'
import type { Option } from '@/components/MultiDropdown'

export const useRecipesSearchParams = (store: RecipeStore, categories: Option[]) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const lastParamsStr = useRef<string | null>(null)

  useEffect(() => {
    const currentParamsStr = searchParams.toString()
    const query = searchParams.get('search') || ''
    const page = parseInt(searchParams.get('page') || '1', 10)
    const categoriesParams = searchParams.get('categories')
    const selectedCategories = categoriesParams
      ? categoriesParams.split(',').map((key) => {
          const cat = categories.find((c) => c.key === key)
          return { key, value: cat ? cat.value : key }
        })
      : []

    store.setSearchQuery(query)
    store.setCurrentPage(page)
    store.setSelectedOptions(selectedCategories)

    if (currentParamsStr !== lastParamsStr.current) {
      store.fetchRecipes()
      lastParamsStr.current = currentParamsStr
    }
  }, [searchParams, categories])

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
