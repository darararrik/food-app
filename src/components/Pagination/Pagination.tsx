import classNames from 'classnames'
import styles from './Pagination.module.scss'
import ArrowButton from './components/ArrowButton'

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
      <ArrowButton
        direction="left"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />

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

      <ArrowButton
        direction="right"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </div>
  )
}
export default Pagination
