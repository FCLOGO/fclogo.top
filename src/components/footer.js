import React from 'react'
import { useIntl } from 'react-intl'
import { LocalizedLink } from 'gatsby-plugin-usei18n'

import LogoIcon from '../../static/assets/icons/logo.inline.svg'
import GithubIcon from '../../static/assets/icons/github.inline.svg'
import TwitterIcon from '../../static/assets/icons/twitter.inline.svg'
import WeiboIcon from '../../static/assets/icons/weibo.inline.svg'
import RssIcon from '../../static/assets/icons/rss.inline.svg'
import CaretIcon from '../../static/assets/icons/caretDown.inline.svg'

import {
  footerWrapper,
  footerLogo,
  logoIcon,
  footerContent,
  socialIcons,
  footerMenu,
  menuTitle,
  menuList,
  menuListItem,
  menuLink,
  logoNumbers,
  copyright
} from './footer.module.styl'

const ListLink = props => (
  <li className={menuListItem}>
    <LocalizedLink className={menuLink} to={props.to}>
      {props.children}
    </LocalizedLink>
  </li>
)

const Footer = () => {
  const intl = useIntl()
  const logoNum = 4567
  const compNum = 38
  const nationNum = 2
  return (
    <footer className={footerWrapper}>
      <section className={footerLogo}>
        <LogoIcon className={logoIcon} />
      </section>
      <section className={footerContent}>
        <div className={socialIcons}>
          <GithubIcon />
          <TwitterIcon />
          <WeiboIcon />
          <RssIcon />
        </div>
        <div className={footerMenu}>
          <h3 className={menuTitle}>
            <label htmlFor="footer-menu">
              About
              <CaretIcon />
            </label>
          </h3>
          <input type="checkbox" id="footer-menu" />
          <ul className={menuList}>
            <ListLink to="/">About</ListLink>
            <ListLink to="/">Contact</ListLink>
            <ListLink to="/">Terms of Use</ListLink>
          </ul>
        </div>
        <div className={logoNumbers}>
          <p>
            <span>{logoNum}</span>logos
          </p>
          <p>
            <span>{compNum}</span>comps
          </p>
          <p>
            <span>{nationNum}</span>nations
          </p>
        </div>
      </section>
      <section className={copyright}>
        {' '}
        {intl.formatMessage(
          { id: `footer.copyright` },
          {
            1: <b>{new Date().getFullYear()}</b>,
            2: (
              <a href="https://creativecommons.org/licenses/by/4.0/">
                <b>CC BY 4.0</b>
              </a>
            )
          }
        )}
        {` `}
      </section>
    </footer>
  )
}

export default Footer
