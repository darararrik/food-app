import type { RouteObject } from 'react-router'
import App from '@/App/App'
import RecipesPage from '@/pages/RecipesPage'
import FavoritesPage from '@/pages/FavoritesPage'
import RecipeDetailPage from '@/pages/RecipeDetailPage'
import ProductsPage from '@/pages/ProductsPage'
import MenuItemsPage from '@/pages/MenuItemsPage'
import PlanningPage from '@/pages/PlanningPage'

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
      {
        path: 'products',
        element: <ProductsPage />,
      },
      {
        path: 'menu-items',
        element: <MenuItemsPage />,
      },
      {
        path: 'planning',
        element: <PlanningPage />,
      },
    ],
  },
]
