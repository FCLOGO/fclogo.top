import React from 'react'
import { LocalizedLink as Link } from 'gatsby-plugin-usei18n'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useIntl } from 'react-intl'
import {
  connectStateResults,
  Highlight,
  Snippet,
  InfiniteHits,
  createInfiniteHitsSessionStorageCache
} from 'react-instantsearch-dom'

const sessionStorageCache = createInfiniteHitsSessionStorageCache()

import ArrowIcon from '../../../static/assets/icons/arrowForward.inline.svg'
import AlgoliaIcon from '../../../static/assets/icons/algolia.inline.svg'

import {
  searchResultWrapper,
  infiniteHits,
  hitsLink,
  hitsImage,
  hitsTitle,
  poweredBy
} from './search-result.module.styl'

const SearchResult = () => {
  const intl = useIntl()

  const Results = connectStateResults(({ searchState, searchResults, children }) =>
    searchResults && searchResults.nbHits !== 0 ? (
      children
    ) : (
      <div>{intl.formatMessage({ id: 'search.noResults' }, { s: <b>{searchState.query}</b> })}</div>
    )
  )

  const Hit = ({ hit }) => (
    <Link className={hitsLink} to={hit.slug}>
      <GatsbyImage className={hitsImage} image={getImage(hit.pngPath)} alt={hit.fullName} />
      <div className={hitsTitle}>
        <h4>
          <Highlight hit={hit} attribute="fullName" tagName="mark" />
        </h4>
        <Snippet hit={hit} attribute="localName" tagName="mark" />
      </div>
      <ArrowIcon />
    </Link>
  )
  return (
    <section className={searchResultWrapper}>
      <Results>
        <InfiniteHits
          className={infiniteHits}
          // showPrevious
          hitComponent={Hit}
          translations={{
            // loadPrevious: 'Load previous',
            loadMore: intl.formatMessage({ id: 'search.loadMore' })
          }}
          cache={sessionStorageCache}
        />
      </Results>
      <div className={poweredBy}>
        <AlgoliaIcon />
      </div>
    </section>
  )
}

export default SearchResult
