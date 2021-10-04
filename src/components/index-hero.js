import React from 'react'
import { useIntl } from 'react-intl'

import AlgoliaSearch from './_algolia'

import {
  heroWrapper,
  heroContent,
  heroTitle,
  heroSubtitle,
  logoNum,
  algWrapper,
  showResult,
  searchTips
} from './index-hero.module.styl'

const IndexHero = ({ totalCount, locale }) => {
  const intl = useIntl()
  return (
    <div className={heroWrapper}>
      <div className={heroContent}>
        <h1 className={heroTitle}>
          {intl.formatMessage(
            { id: `hero.title` },
            { s: <span className={logoNum}>{totalCount}</span> }
          )}
        </h1>
        <p className={heroSubtitle}>{intl.formatMessage({ id: `hero.subtitle` })}</p>
        <section className={algWrapper}>
          <AlgoliaSearch showClass={showResult} locale={locale} />
          <p className={searchTips}>{intl.formatMessage({ id: `search.tips` })}</p>
        </section>
      </div>
    </div>
  )
}

export default IndexHero
