import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { observer } from 'mobx-react-lite'
import { useLocalStore } from '@/shared/hooks/useLocalStore'
import { RecipeDetailStore } from '../../store/RecipeDetailStore/RecipeDetailStore'
import styles from './RecipeDetailPage.module.scss'
import Text from '@/components/Text'
import ArrowButton from '@/components/Pagination/components/ArrowButton'
import HeroImage from './components/HeroImage'
import IngredientsAndEquipment from './components/IngredientsAndEquipment'
import Directions from './components/Directions/Directions'
import parse from 'html-react-parser'

const RecipeDetailPage = observer(() => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const store = useLocalStore(() => new RecipeDetailStore())

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate('/', { replace: true })
    }
  }

  useEffect(() => {
    if (id) {
      store.fetchRecipe(id)
    }
  }, [id, store])

  if (store.isLoading) return <div className={styles.loading}>Загрузка...</div>
  const { recipe } = store

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
})

export default RecipeDetailPage
