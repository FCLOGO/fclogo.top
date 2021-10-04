import { createRef, default as React, useState, useMemo } from 'react'
import algoliasearch from 'algoliasearch'
import { InstantSearch, Configure } from 'react-instantsearch-dom'
import SearchBox from './search-box'
import SearchResult from './search-result'
import UseClickOutside from './use-click-outside'

const AlgoliaSearch = ({ showClass, locale }) => {
  const searchClient = useMemo(
    () => algoliasearch(process.env.GATSBY_ALGOLIA_APP_ID, process.env.GATSBY_ALGOLIA_SEARCH_KEY),
    []
  )
  const indices = process.env.GATSBY_ALGOLIA_INDEX_NAME
  const rootRef = createRef()
  const [query, setQuery] = useState()
  const [hasFocus, setFocus] = useState(false)
  UseClickOutside(rootRef, () => setFocus(false))
  const isShow = query && query.length > 0 && hasFocus
  return (
    <div className={isShow ? `${showClass}` : ``} ref={rootRef}>
      <InstantSearch
        ref={rootRef}
        searchClient={searchClient}
        indexName={indices}
        onSearchStateChange={({ query }) => setQuery(query)}
      >
        <Configure filters={`locale:${locale}`} />
        <SearchResult />
        <SearchBox onFocus={() => setFocus(true)} hasFocus={hasFocus} />
      </InstantSearch>
    </div>
  )
}

export default AlgoliaSearch
