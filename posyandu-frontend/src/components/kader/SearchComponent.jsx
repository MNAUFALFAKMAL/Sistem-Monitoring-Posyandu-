import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { debounce } from '../../utils/helper'

const SearchComponent = ({ onSearch, placeholder = "Cari..." }) => {
  const [query, setQuery] = useState('')

  const debouncedSearch = debounce((value) => {
    onSearch(value)
  }, 500)

  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)
    debouncedSearch(value)
  }

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search size={20} className="text-gray-400" />
      </div>
      <input
        type="text"
        className="form-input pl-10"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
      />
    </div>
  )
}

export default SearchComponent