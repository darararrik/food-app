import type { RouteObject } from "react-router";
import App from "../App/App";
import RecipesPage from "../pages/RecipesPage/RecipesPage";
import RecipeDetailPage from "../pages/RecipeDetailPage/RecipeDetailPage";

export const routesConfig: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <RecipesPage />,
      },
      {
        path: "recipes",
        element: <RecipesPage />,
      },
      {
        path: "recipes/:id",
        element: <RecipeDetailPage />,
      },
    ],
  },
];
