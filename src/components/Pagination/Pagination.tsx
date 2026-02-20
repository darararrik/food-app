import classNames from 'classnames'
import arrowLeft from '@/assets/arrow-left.svg'
import arrowRight from '@/assets/arrow-right.svg'
import styles from './Pagination.module.scss'

type PaginationProps = {
  currentPage: number
  totalPages: number
  handlePageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  handlePageChange,
}: PaginationProps) => {
  return (
    <div className={styles.pagination}>
      <button
        className={styles.arrowButton}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <img src={arrowLeft} alt="Previous" />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          className={classNames(styles.pageButton, {
            [styles.active]: page === currentPage,
          })}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className={styles.arrowButton}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <img src={arrowRight} alt="Next" />
      </button>
    </div>
  )
}
export default Pagination
