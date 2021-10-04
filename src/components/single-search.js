import React from 'react'

import AlgoliaSearch from './_algolia'

import { searchWrapper, searchInner, showResult } from './single-search.module.styl'

const SingleHero = ({ locale }) => {
  return (
    <div className={searchWrapper}>
      <div className={searchInner}>
        <AlgoliaSearch showClass={showResult} locale={locale} />
      </div>
    </div>
  )
}

export default SingleHero
