import type { RouteObject } from 'react-router'
import App from '@/App/App'
import RecipesPage from '@/pages/RecipesPage'
import FavoritesPage from '@/pages/Favorites'
import RecipeDetailPage from '@/pages/RecipeDetailPage'

export const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <RecipesPage />,
      },
      {
        path: 'recipes/:id',
        element: <RecipeDetailPage />,
      },
      {
        path: 'favorites',
        element: <FavoritesPage />,
      },
    ],
  },
]
