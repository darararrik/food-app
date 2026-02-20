import arrowLeft from '@/assets/arrow-left.svg'
import arrowRight from '@/assets/arrow-right.svg'
import styles from './ArrowButton.module.scss'
import classNames from 'classnames'

type ArrowButtonProps = {
  direction: 'left' | 'right'
  onClick: () => void
  disabled?: boolean
  className?: string
}

const ArrowButton: React.FC<ArrowButtonProps> = ({ direction, onClick, disabled, className }) => {
  const icon = direction === 'left' ? arrowLeft : arrowRight
  const altText = direction === 'left' ? 'Previous' : 'Next'

  return (
    <button
      className={classNames(styles.arrowButton, className)}
      onClick={onClick}
      disabled={disabled}
    >
      <img src={icon} alt={altText} />
    </button>
  )
}

export default ArrowButton
