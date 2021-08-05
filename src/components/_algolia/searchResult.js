import React from 'react'
import { Link } from 'gatsby'
import {
  connectStateResults,
  Highlight,
  Hits,
  Index,
  Snippet,
  PoweredBy
} from 'react-instantsearch-dom'

import { searchResultWrapper } from './searchResult.module.styl'

const SearchResult = ({ isShow, showClass }) => {
  return (
    <div className={`${searchResultWrapper} ${isShow ? `${showClass}` : ``}`}>
      <p>Search Results</p>
      <Hits />
    </div>
  )
}

export default SearchResult
