import React from 'react'

import SearchIcon from '../../static/assets/icons/search.svg'

import heroStyles from '../styles/_partial/hero.module.styl'

export default function Hero() {
  return (
    <div className={heroStyles.indexHero}>
      <div className={heroStyles.heroContent}>
        <h1 className={heroStyles.heroTitle}>
          Access <span className={heroStyles.logoNum}>4,079,000</span> vector logos
        </h1>
        <p className={heroStyles.heroSubtitle}>
          All logos work with SVG and AI. No account and unlimited downloads for free.
        </p>
        <section className={heroStyles.heroSearch}>
          <form action="/" method="get">
            <input type="search" placeholder="Search for football club logos" />
            <button type="submit">
              <SearchIcon />
              Search
            </button>
            <p>For example: Facebook, Tesla or Coca Cola</p>
          </form>
        </section>
      </div>
    </div>
  )
}
