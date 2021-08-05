import React from 'react'

import AlgoliaSearch from './_algolia'

import { searchWrapper, searchInner, showResult } from './singleSearch.module.styl'

const SingleHero = () => {
  return (
    <div className={searchWrapper}>
      <div className={searchInner}>
        <AlgoliaSearch showClass={showResult} />
      </div>
    </div>
  )
}

export default SingleHero
