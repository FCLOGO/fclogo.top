import React from 'react'

import { heroWrapper, heroContent, heroSlogan } from './pageHero.module.styl'

const PageHero = ({ pageSlogan }) => {
  return (
    <div className={heroWrapper}>
      <div className={heroContent}>
        <p className={heroSlogan}>{pageSlogan}</p>
      </div>
    </div>
  )
}

export default PageHero
