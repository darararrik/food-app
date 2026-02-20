import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { getRecipeById } from "@/shared/api/recipe";
import type { Recipe } from "@/shared/types/recipe";
import styles from "./RecipeDetailPage.module.scss";

const RecipeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      getRecipeById(id)
        .then((response) => {
          setRecipe(response.data);
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <div className={styles.loading}>Загрузка рецепта...</div>;
  if (error) return <div className={styles.error}>Ошибка: {error}</div>;
  if (!recipe) return <div className={styles.error}>Рецепт не найден</div>;

  return (
    <div className={styles.container}>
      <Link to="/recipes" className={styles.backLink}>
        ← К списку рецептов
      </Link>

      <div className={styles.content}>
        {recipe.images?.[0] && (
          <img
            src={recipe.images[0].url}
            alt={recipe.title}
            className={styles.mainImage}
          />
        )}

        <div className={styles.info}>
          <h1 className={styles.title}>{recipe.title}</h1>
          <p className={styles.description}>{recipe.description}</p>

          {/* Здесь можно добавить отображение ингредиентов и т.д. */}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
