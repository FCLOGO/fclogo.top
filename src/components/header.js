import React from 'react'
import { LocalizedLink as Link, useLocalization } from 'gatsby-theme-i18n'
import { ThemeToggler } from 'gatsby-plugin-dark-mode'

import LogoIcon from '../../static/assets/icons/logo.svg'
import SwitchLang from '../../static/assets/icons/language.svg'
import DonateIcon from '../../static/assets/icons/heart.svg'

import headerStyles from '../styles/_partial/header.module.styl'

export default function Header() {
  const { config } = useLocalization()
  return (
    <header className={headerStyles.headerWrapper}>
      <h1 className={headerStyles.logoWrapper}>
        <Link to="/" className={headerStyles.logoLink}>
          <LogoIcon />
        </Link>
      </h1>
      <div className={headerStyles.togglesWrappper}>
        <div className={headerStyles.toggelTheme}>
          <ThemeToggler>
            {({ theme, toggleTheme }) => {
              if (theme == null) {
                return null
              }
              return (
                <label htmlFor="toggleTheme">
                  <input
                    id="toggleTheme"
                    name="toggleTheme"
                    type="checkbox"
                    onChange={e => toggleTheme(e.target.checked ? 'dark' : 'light')}
                    checked={theme === 'dark'}
                  />
                  <span></span>{' '}
                </label>
              )
            }}
          </ThemeToggler>
        </div>
        <nav className={headerStyles.i18nNav}>
          <SwitchLang />
          <div className={headerStyles.i18nNavInner}>
            <ul className={headerStyles.i18nNavList}>
              {config.map(local => (
                <li key={local.code} className={headerStyles.i18nNavListItem}>
                  <Link to="/" language={local.code}>
                    {local.localName}
                  </Link>
                </li>
              ))}
            </ul>
            <span className={headerStyles.arrow_1}></span>
            <span className={headerStyles.arrow_2}></span>
          </div>
        </nav>
        <div className={headerStyles.donateButton}>
          <DonateIcon />
          <span>Sponsor</span>
        </div>
      </div>
    </header>
  )
}
