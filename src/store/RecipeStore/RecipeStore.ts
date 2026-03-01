import { makeAutoObservable, runInAction } from 'mobx'
import { RecipeApi } from '@/api/recipe'
import { toModel, type Recipe } from '@/types/Recipe'
import type { ILocalStore } from '@/shared/hooks/useLocalStore'
import type { Option } from '@/components/MultiDropdown'
import { CategoryApi } from '@/api/category'

type PrivateFields =
  | '_recipes'
  | '_currentPage'
  | '_totalPages'
  | '_searchQuery'
  | '_isLoading'
  | '_selectedOptions'
  | '_categories'

export class RecipesStore implements ILocalStore {
  private _recipes: Recipe[] = []
  private _currentPage = 1
  private _totalPages = 1
  private _searchQuery = ''
  private _selectedOptions: Option[] = []
  private _categories: Option[] = []
  private _isLoading = false

  constructor() {
    makeAutoObservable<RecipesStore, PrivateFields>(this)
    console.log('RecipesStore created')
  }

  get recipes(): Recipe[] {
    return this._recipes
  }

  get currentPage(): number {
    return this._currentPage
  }

  get totalPages(): number {
    return this._totalPages
  }

  get searchQuery(): string {
    return this._searchQuery
  }

  get selectedOptions(): Option[] {
    return this._selectedOptions
  }

  get categories(): Option[] {
    return this._categories
  }

  get isLoading(): boolean {
    return this._isLoading
  }

  async fetchCategories() {
    try {
      const response = await CategoryApi.getCategories()
      runInAction(() => {
        this._categories = response.data.map((cat) => ({
          key: cat.id.toString(),
          value: cat.title,
        }))
      })
    } catch (error) {
      console.error(error)
    }
  }

  setSearchQuery(query: string) {
    if (this._searchQuery !== query) {
      this._searchQuery = query
      this._currentPage = 1
    }
  }

  setSelectedOptions(options: Option[]) {
    const currentKeys = this._selectedOptions.map((o) => o.key).join(',')
    const newKeys = options.map((o) => o.key).join(',')

    if (currentKeys !== newKeys) {
      this._selectedOptions = options
      this._currentPage = 1
    }
  }

  setCurrentPage(page: number) {
    this._currentPage = page
  }

  async fetchRecipes() {
    this._isLoading = true
    try {
      const response = await RecipeApi.getRecipes(
        this._currentPage,
        this._searchQuery,
        this._selectedOptions.map((o) => o.key),
      )
      runInAction(() => {
        this._recipes = response.data.map((recipe) => toModel(recipe))
        this._totalPages = response.meta.pagination.pageCount
        this._isLoading = false
      })
    } catch (error) {
      console.error(error)
      runInAction(() => {
        this._isLoading = false
      })
    }
  }

  destroy(): void {
    console.log('RecipesStore destroyed')
    this._recipes = []
  }
}
