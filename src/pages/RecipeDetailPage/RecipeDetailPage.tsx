import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { RecipeApi } from '@/shared/api/recipe'
import type { Recipe } from '@/shared/types/recipe'
import styles from './RecipeDetailPage.module.scss'
import Text from '@/components/Text'
import ArrowButton from '@/components/Pagination/components/ArrowButton'
import HeroImage from './components/HeroImage'
import IngredientsAndEquipment from './components/IngredientsAndEquipment'
import Directions from './components/Directions/Directions'
import parse from 'html-react-parser'

const RecipeDetailPage = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate('/', { replace: true })
    }
  }
  useEffect(() => {
    if (id) {
      RecipeApi.getRecipeById(id)
        .then((response) => {
          setRecipe(response.data)
        })
        .catch((err) => {
          console.log(err.message)
        })
    }
  }, [id])

  if (!recipe) return <div className={styles.error}>Рецепт не найден</div>

  return (
    <div className={styles.main}>
      <section className={styles.heroContent}>
        <div className={styles.header}>
          <ArrowButton className={styles.arrowButton} direction="left" onClick={handleBack} />
          <Text view="title">{recipe.name}</Text>
        </div>
        <HeroImage recipe={recipe} />
      </section>
      <section className={styles.content}>
        <div className={styles.summaryContainer}>
          <Text view="p-16">{recipe.summary ? parse(recipe.summary) : ''}</Text>
        </div>
        <IngredientsAndEquipment recipe={recipe} />
        <Directions direction={recipe.directions} />
      </section>
    </div>
  )
}

export default RecipeDetailPage
