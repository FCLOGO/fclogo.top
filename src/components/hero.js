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
  searchTips
} from './hero.module.styl'

const Hero = () => {
  const intl = useIntl()
  const totalNum = 985621
  return (
    <div className={heroWrapper}>
      <div className={heroContent}>
        <h1 className={heroTitle}>
          {intl.formatMessage(
            { id: `hero.title` },
            { s: <span className={logoNum}>{totalNum}</span> }
          )}
        </h1>
        <p className={heroSubtitle}>{intl.formatMessage({ id: `hero.subtitle` })}</p>
        <section className={algWrapper}>
          <AlgoliaSearch />
          <p className={searchTips}>{intl.formatMessage({ id: `search.tips` })}</p>
        </section>
      </div>
    </div>
  )
}

export default Hero
