import React from 'react'
import { LocalizedLink as Link } from 'gatsby-plugin-usei18n'
import MainNav from './_header/mainNav'

import LogoIcon from '../../static/assets/icons/logo.inline.svg'
import DonateIcon from '../../static/assets/icons/heart.inline.svg'

import { headerWrapper, logoWrapper, logoLink, logoIcon, donateIcon } from './header.module.styl'

export default function Header({ pageContext }) {
  return (
    <header className={headerWrapper}>
      <h1 className={logoWrapper}>
        <Link to="/" className={logoLink}>
          <LogoIcon className={logoIcon} />
        </Link>
      </h1>
      <MainNav pageContext={pageContext} />
      <DonateIcon className={donateIcon} />
    </header>
  )
}
