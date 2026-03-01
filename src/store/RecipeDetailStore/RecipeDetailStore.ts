import { makeAutoObservable, runInAction } from 'mobx'
import { RecipeApi } from '@/api/recipe'
import { toModel, type Recipe } from '@/types/Recipe'
import type { ILocalStore } from '@/shared/hooks/useLocalStore'

type PrivateFields = '_recipe' | '_isLoading'

export class RecipeDetailStore implements ILocalStore {
  private _recipe: Recipe | null = null
  private _isLoading = false

  constructor() {
    makeAutoObservable<RecipeDetailStore, PrivateFields>(this)
    console.log('RecipeDetailStore created')
  }

  get recipe(): Recipe | null {
    return this._recipe
  }

  get isLoading(): boolean {
    return this._isLoading
  }

  async fetchRecipe(id: string) {
    this._isLoading = true
    try {
      const response = await RecipeApi.getRecipeById(id)
      runInAction(() => {
        this._recipe = toModel(response.data)
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
    console.log('RecipeDetailStore destroyed')
    this._recipe = null
  }
}
