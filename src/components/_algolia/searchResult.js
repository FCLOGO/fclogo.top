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

import { searchResultWrapper, showResult } from './searchResult.module.styl'

const SearchResult = ({ isShow }) => {
  return (
    <div className={`${searchResultWrapper} ${isShow ? `${showResult}` : ``}`}>
      <p>Search Results</p>
      <Hits />
    </div>
  )
}

export default SearchResult
