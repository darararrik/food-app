import { UserStore } from './UserStore/UserStore'
import { FavoriteStore } from './FavoriteStore/FavoriteStore'
import { RecipesStore } from './RecipeStore/RecipeStore'

export class RootStore {
  user: UserStore
  favorite: FavoriteStore
  recipesStore: RecipesStore

  constructor() {
    this.user = new UserStore()
    this.favorite = new FavoriteStore()
    this.recipesStore = new RecipesStore()
  }
}
