import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link, Trans, useTranslation } from 'gatsby-plugin-react-i18next'
import { useInstantSearch, Highlight, Snippet, InfiniteHits } from 'react-instantsearch'

import ArrowIcon from '../../../static/assets/icons/arrowForward.inline.svg'

import { createInfiniteHitsSessionStorageCache } from 'instantsearch.js/es/lib/infiniteHitsCache'

const sessionStorageCache = createInfiniteHitsSessionStorageCache()

const SearchResult = () => {
  const { t } = useTranslation()

  const CustomStats = ({ children }) => {
    const { results, indexUiState } = useInstantSearch()
    const { query, nbHits } = results
    if (!indexUiState.query) {
      return (
        <div>
          <p className="text-light-gray">{t('search.tryTips')}</p>
        </div>
      )
    }
    return results && results.nbHits !== 0 ? (
      <div>
        <p className="mb-lg">
          <Trans i18nKey="search.results">
            <b>{{ nbHits }}</b> results found for the query <b>{{ query }}</b>
          </Trans>
        </p>
        {children}
      </div>
    ) : (
      <p className="mb-lg">
        <Trans i18nKey="search.noResults">
          No results have been found for <b>{{ query }}</b> 😶
        </Trans>
      </p>
    )
  }

  const Hit = ({ hit }) => (
    <Link
      to={hit.slug}
      className="w-full h-header flex flex-row flex-nowrap justify-between items-center bg-gray p-md mb-md rounded-md group hover:bg-green hover:text-white"
    >
      <GatsbyImage
        image={getImage(hit.pngPath)}
        alt={hit.fullName}
        className="flex-none h-[40px] w-[40px] mr-lg"
      />
      <div className="flex-1 flex flex-col justify-center text-left">
        <h4 className="mb-xs">
          <Highlight
            hit={hit}
            attribute="fullName"
            tagName="mark"
            classNames={{
              highlighted: 'font-bold group-hover:text-white border-b-2'
            }}
          />
        </h4>
        <Snippet
          hit={hit}
          attribute="localName"
          tagName="mark"
          classNames={{
            root: 'text-xs',
            highlighted: 'font-bold group-hover:text-white border-b-2'
          }}
        />
      </div>
      <ArrowIcon className="w-lg h-lg stroke-dark-gray group-hover:stroke-white" />
    </Link>
  )

  return (
    <section className="w-full text-dark-gray max-h-[260px] overflow-x-hidden overflow-y-auto py-xl border-t border-dashed border-gray-1">
      <CustomStats>
        <InfiniteHits
          showPrevious={false}
          hitComponent={Hit}
          translations={{
            showMoreButtonText: t('search.loadMore')
          }}
          cache={sessionStorageCache}
          classNames={{
            root: 'flex-auto flex flex-col items-center mx-xl',
            list: 'w-full mb-lg',
            loadMore: 'py-xs px-sm mb-lg rounded text-white bg-green hover:bg-light-green',
            disabledLoadMore: 'hidden'
          }}
        />
      </CustomStats>
    </section>
  )
}

export default SearchResult
