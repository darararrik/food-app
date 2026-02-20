import type { Direction } from '@/shared/types/recipe'
import Text from '@/components/Text'
import styles from './Directions.module.scss'

type DirectionsProps = {
  direction: Direction[]
}

const Directions: React.FC<DirectionsProps> = ({ direction }) => {
  console.log(direction)
  return (
    <div className={styles.directionsContainer}>
      {direction.map((item, index) => (
        <div key={item.id}>
          <Text view="p-16" className={styles.title}>
            Step {index + 1}
          </Text>
          <Text view="p-14">{item.description}</Text>
        </div>
      ))}
    </div>
  )
}
export default Directions
