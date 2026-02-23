import React, { useMemo } from 'react'
import classNames from 'classnames'
import styles from './Pagination.module.scss'
import ArrowButton from './components/ArrowButton'

type PaginationProps = {
  currentPage: number
  totalPages: number
  handlePageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, handlePageChange }) => {
  const paginationRange = useMemo(() => {
    const range: (number | string)[] = []
    const siblingCount = 1

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - siblingCount && i <= currentPage + siblingCount)
      ) {
        range.push(i)
      } else if (i === currentPage - siblingCount - 1 || i === currentPage + siblingCount + 1) {
        range.push('...')
      }
    }

    return range.filter((item, index) => range.indexOf(item) === index)
  }, [currentPage, totalPages])

  if (totalPages <= 1) return null

  return (
    <div className={styles.pagination}>
      <ArrowButton
        direction="left"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />

      {paginationRange.map((page, index) => {
        if (page === '...') {
          return (
            <span key={`ellipsis-${index}`} className={styles.ellipsis}>
              {page}
            </span>
          )
        }

        return (
          <button
            key={page}
            className={classNames(styles.pageButton, {
              [styles.active]: page === currentPage,
            })}
            onClick={() => handlePageChange(page as number)}
          >
            {page}
          </button>
        )
      })}

      <ArrowButton
        direction="right"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </div>
  )
}

export default Pagination
