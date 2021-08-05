import React, { useState, useMemo } from 'react'
import algoliasearch from 'algoliasearch'
import { InstantSearch } from 'react-instantsearch-dom'
import SearchBox from './searchBox'
import SearchResult from './searchResult'

const AlgoliaSearch = ({ showClass }) => {
  const searchClient = useMemo(
    () => algoliasearch(process.env.GATSBY_ALGOLIA_APP_ID, process.env.GATSBY_ALGOLIA_SEARCH_KEY),
    []
  )
  const indices = process.env.GATSBY_ALGOLIA_INDEX_NAME
  const [query, setQuery] = useState()
  const [hasFocus, setFocus] = useState(false)
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={indices}
      onSearchStateChange={({ query }) => setQuery(query)}
    >
      <SearchResult isShow={query && query.length > 0 && hasFocus} showClass={showClass} />
      <SearchBox
        onFocus={() => setFocus(true)}
        hasFocus={hasFocus}
        onBlur={() => setFocus(false)}
      />
    </InstantSearch>
  )
}

export default AlgoliaSearch
