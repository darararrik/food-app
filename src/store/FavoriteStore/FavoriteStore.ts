import { makeAutoObservable, runInAction } from 'mobx'
import { RecipeApi } from '@/api/recipe'
import { toModel, type Recipe } from '@/types/Recipe'

type PrivateFields = '_favorites' | '_isLoading'

export class FavoriteStore {
  private _favorites: Recipe[] = []
  private _isLoading = false

  constructor() {
    makeAutoObservable<FavoriteStore, PrivateFields>(this)
    console.log('FavoriteStore created')
  }

  get favorites(): Recipe[] {
    return this._favorites
  }

  get isLoading(): boolean {
    return this._isLoading
  }

  async fetchFavorites() {
    this._isLoading = true
    try {
      const response = await RecipeApi.getFavoriteRecipes()
      runInAction(() => {
        this._favorites = response.map((fav) => toModel(fav.recipe))
        this._isLoading = false
      })
    } catch (error) {
      console.error(error)
      runInAction(() => {
        this._isLoading = false
      })
    }
  }

  async toggleFavorite(recipeId: string) {
    const isFavorite = this._favorites.some((fav) => fav.documentId === recipeId)
    try {
      if (isFavorite) {
        await RecipeApi.deleteRecipe(recipeId)
        runInAction(() => {
          this._favorites = this._favorites.filter((fav) => fav.documentId !== recipeId)
        })
      } else {
        await RecipeApi.saveRecipe(recipeId)
        await this.fetchFavorites()
      }
    } catch (error) {
      console.error(error)
    }
  }

  get isFavorite() {
    return (recipeId: string) => this._favorites.some((fav) => fav.documentId === recipeId)
  }
}
