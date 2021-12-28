import React from 'react'
import { useIntl } from 'react-intl'
import { LocalizedLink } from 'gatsby-plugin-usei18n'

import LogoIcon from '../../static/assets/icons/fclogo.inline.svg'
import GithubIcon from '../../static/assets/icons/github.inline.svg'
import TwitterIcon from '../../static/assets/icons/twitter.inline.svg'
import WeiboIcon from '../../static/assets/icons/weibo.inline.svg'
import DiscordIcon from '../../static/assets/icons/discord.inline.svg'
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
          <a href="https://discord.gg/gVcbysaEWD" target="_blank" className={socialLink}>
            <DiscordIcon />
          </a>
          {/* <a href="/" target="_blank" className={socialLink}>
            <RssIcon />
          </a> */}
        </div>
        <div className={footerMenu}>
          <ul className={menuList}>
            <ListLink to="/about">{intl.formatMessage({ id: `menu.about` })}</ListLink>
            <ListLink to="/contact">{intl.formatMessage({ id: `menu.contact` })}</ListLink>
            <ListLink to="/sources">{intl.formatMessage({ id: `menu.sources` })}</ListLink>
            <ListLink to="/support/terms-of-use">
              {intl.formatMessage({ id: `menu.terms` })}
            </ListLink>
            <ListLink to="/support/what-is-new">
              {intl.formatMessage({ id: `menu.whatsnew` })}
            </ListLink>
          </ul>
        </div>
      </section>
      <section className={copyright}>
        <span>{intl.formatMessage({ id: `footer.statement` })}</span>
        <span>
          {intl.formatMessage(
            { id: `footer.copyright` },
            {
              1: <span>{new Date().getFullYear()}</span>,
              2: <b>FCLOGO.TOP</b>
            }
          )}
        </span>
      </section>
    </footer>
  )
}

export default Footer
