import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next'
import { useInstantSearch, Highlight, Snippet, InfiniteHits } from 'react-instantsearch'

import ModalLink from '../../helpers/modal-link'
import TopDownloads from './top-downloads'

import ArrowIcon from '../../../static/assets/icons/arrowForward.inline.svg'

import { createInfiniteHitsSessionStorageCache } from 'instantsearch.js/es/lib/infiniteHitsCache'

const sessionStorageCache = createInfiniteHitsSessionStorageCache()

const SearchResult = ({ allLogo }) => {
  const { t } = useTranslation()

  const CustomStats = ({ children }) => {
    const { results, indexUiState } = useInstantSearch()
    const { query, nbHits } = results
    if (!indexUiState.query) {
      return <TopDownloads allLogo={allLogo} />
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
    <ModalLink
      to={hit.slug}
      state={{
        modal: true,
        noScroll: true
      }}
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
      <div className="mx-md flex justify-between items-center content-center">
        {hit.version !== 0 && (
          <span className="font-mono mr-sm uppercase text-xs leading-3 px-sm py-xs rounded-full text-light-gray group-hover:text-white border border-light-gray group-hover:border-gray">
            {hit.version}
          </span>
        )}
        <span className="uppercase text-xs px-sm py-xs leading-3 rounded-full text-light-gray group-hover:text-white border border-light-gray group-hover:border-gray">
          {t(hit.style)}
        </span>
      </div>
      <ArrowIcon className="w-lg h-lg stroke-dark-gray group-hover:stroke-white" />
    </ModalLink>
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
