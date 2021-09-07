import React from 'react'
import { useIntl } from 'react-intl'
import { LocalizedLink } from 'gatsby-plugin-usei18n'

import LogoIcon from '../../static/assets/icons/logo.inline.svg'
import GithubIcon from '../../static/assets/icons/github.inline.svg'
import TwitterIcon from '../../static/assets/icons/twitter.inline.svg'
import WeiboIcon from '../../static/assets/icons/weibo.inline.svg'
import RssIcon from '../../static/assets/icons/rss.inline.svg'

import {
  footerWrapper,
  footerLogo,
  logoIcon,
  footerContent,
  socialLink,
  socialIcons,
  footerMenu,
  menuList,
  menuListItem,
  menuLink,
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
  return (
    <footer className={footerWrapper}>
      <section className={footerLogo}>
        <LocalizedLink to="/">
          <LogoIcon className={logoIcon} />
        </LocalizedLink>
      </section>
      <section className={footerContent}>
        <div className={socialIcons}>
          <a href="https://github.com/FCLOGO" target="_blank" className={socialLink}>
            <GithubIcon />
          </a>
          <a href="https://twitter.com/fclogotop" target="_blank" className={socialLink}>
            <TwitterIcon />
          </a>
          <a href="https://weibo.com/7578670869" target="_blank" className={socialLink}>
            <WeiboIcon />
          </a>
          <a href="/" target="_blank" className={socialLink}>
            <RssIcon />
          </a>
        </div>
        <div className={footerMenu}>
          <ul className={menuList}>
            <ListLink to="/">About</ListLink>
            <ListLink to="/">Contact</ListLink>
            <ListLink to="/">Terms of Use</ListLink>
            <ListLink to="/">What’s new</ListLink>
          </ul>
        </div>
      </section>
      <section className={copyright}>
        {' '}
        {intl.formatMessage(
          { id: `footer.copyright` },
          {
            1: <span>{new Date().getFullYear()}</span>,
            2: <b>FCLOGO.TOP</b>
          }
        )}
        {` `}
      </section>
    </footer>
  )
}

export default Footer
