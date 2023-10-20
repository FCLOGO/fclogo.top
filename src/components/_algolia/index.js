import { createRef, default as React, useState, useMemo } from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import algoliasearch from 'algoliasearch'
import { InstantSearch, Configure, SearchBox, PoweredBy } from 'react-instantsearch'

import SearchResult from './search-result'
import UseClickOutside from '../../hooks/use-click-outside'

const AlgoliaSearch = ({ locale, allLogo }) => {
  const { t } = useTranslation()

  // Algolia Client
  const algoliaClient = useMemo(
    () => algoliasearch(process.env.GATSBY_ALGOLIA_APP_ID, process.env.GATSBY_ALGOLIA_SEARCH_KEY),
    []
  )

  // Custom Algolia Client
  const searchClient = {
    ...algoliaClient,
    search(requests) {
      if (requests.every(({ params }) => !params.query)) {
        return Promise.resolve({
          results: requests.map(() => ({
            hits: [],
            nbHits: 0,
            nbPages: 0,
            page: 0,
            processingTimeMS: 0,
            hitsPerPage: 0,
            exhaustiveNbHits: false,
            query: '',
            params: ''
          }))
        })
      }

      return algoliaClient.search(requests)
    }
  }

  // Algolia IndexName
  const indices = process.env.GATSBY_ALGOLIA_INDEX_NAME

  // 搜索逻辑
  const queryHook = (query, search) => {
    // 只有在输入非空字符时开始搜索
    query.trim() !== '' && search(query)
  }

  // 创建一个引用用于获取根元素的实例
  const rootRef = createRef()

  // 创建一个状态用于记录元素是否获得焦点，默认为 false
  const [hasFocus, setFocus] = useState(false)

  // 使用 useClickOutside 钩子，当用户点击页面其他地方时执行回调函数设置焦点为 false
  UseClickOutside(rootRef, () => setFocus(false))

  return (
    <div ref={rootRef} className="relative">
      <InstantSearch
        searchClient={searchClient}
        indexName={indices}
        onSearchStateChange={({ query }) => setQuery(query)}
      >
        <Configure filters={`locale:${locale}`} />
        <SearchBox
          searchAsYouType={true}
          placeholder={t(`search.placeholder`)}
          autoFocus
          queryHook={queryHook}
          classNames={{
            form: `h-header bg-white rounded-lg flex flex-nowrap justify-between items-center relative ${
              hasFocus ? 'rounded-b-none' : ''
            }`,
            input: `text-dark-gray h-header rounded-lg flex-auto order-1 px-xl`,
            submit: `order-3 h-header w-header text-center rounded-lg flex items-center justify-center`,
            submitIcon: 'h-xl w-xl',
            reset: 'order-2',
            resetIcon: 'h-md w-md',
            loadingIndicator: 'absolute left-[6px]',
            loadingIcon: 'h-md w-md'
          }}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
        {hasFocus && (
          <div className="bg-white w-full shadow-card absolute top-header rounded-b-lg flex flex-col">
            <SearchResult allLogo={allLogo} />
            <PoweredBy
              classNames={{
                root: 'h-auto px-2xl py-lg flex flex-row-reverse items-center border-t border-gray-1',
                logo: 'h-md'
              }}
            />
          </div>
        )}
      </InstantSearch>
    </div>
  )
}

export default AlgoliaSearch
