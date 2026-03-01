import { useState } from 'react'
import Button from '@/components/Button'
import SearchIcon from '@/components/icons/SearchIcon'
import Input from '@/components/Input'
import styles from './Search.module.scss'
import MultiDropdown, { type Option } from '@/components/MultiDropdown'

export type SearchProps = {
  onSearch: (value: string) => void
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('')
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([])

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <Input
          placeholder="Enter dishes"
          value={searchValue}
          onChange={(value) => setSearchValue(value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSearch(searchValue)
            }
          }}
        />
        <Button onClick={() => onSearch(searchValue)}>
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
