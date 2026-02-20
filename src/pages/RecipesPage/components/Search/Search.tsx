import { useState } from 'react' // 1. Импортируем useState
import Button from '@/components/Button'
import SearchIcon from '@/components/icons/SearchIcon'
import Input from '@/components/Input'
import styles from './Search.module.scss'
import MultiDropdown, { type Option } from '@/components/MultiDropdown'

const Search = () => {
  const [searchValue, setSearchValue] = useState('')
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([])

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <Input
          placeholder="Enter dishes"
          value={searchValue}
          onChange={(value) => setSearchValue(value)}
        />
        <Button>
          <SearchIcon />
        </Button>
      </div>
      <MultiDropdown
        className={styles.multiDropdown}
        options={[]}
        value={selectedOptions}
        onChange={setSelectedOptions}
        getTitle={(options) =>
          options.length > 0 ? options.map((o) => o.value).join(', ') : 'Categories'
        }
      />
    </div>
  )
}

export default Search
