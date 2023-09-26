import React from 'react'
import { Link, useTranslation } from 'gatsby-plugin-react-i18next'

import LogoIcon from '../../static/assets/icons/fclogo.inline.svg'
import GithubIcon from '../../static/assets/icons/github.inline.svg'
import TwitterIcon from '../../static/assets/icons/twitter.inline.svg'
import WeiboIcon from '../../static/assets/icons/weibo.inline.svg'
import DiscordIcon from '../../static/assets/icons/discord.inline.svg'

const SocialMedia = [
  {
    title: 'Github',
    link: 'https://github.com/FCLOGO',
    icon: <GithubIcon className="h-2xl w-2xl" />
  },
  {
    title: 'Twitter',
    link: 'https://twitter.com/fclogotop',
    icon: <TwitterIcon className="h-2xl w-2xl" />
  },
  {
    title: 'Weibo',
    link: 'https://weibo.com/7578670869',
    icon: <WeiboIcon className="h-2xl w-2xl" />
  },
  {
    title: 'Discord',
    link: 'https://discord.gg/gVcbysaEWD',
    icon: <DiscordIcon className="h-2xl w-2xl" />
  }
]

const ListLink = props => (
  <li className="list-none inline-block mr-md last:mr-zero">
    <Link
      to={props.to}
      className="uppercase font-semibold h-[40px] p-sm rounded transform-none whitespace-nowrap hover:bg-black hover:bg-opacity-20"
    >
      {props.children}
    </Link>
  </li>
)

const Footer = () => {
  const { t } = useTranslation()
  return (
    <footer className="z-19 flex-initial w-full p-[40px] bg-dark-gray text-gray flex flex-col flex-wrap justify-center items-start">
      <section className="max-w-[1400px] w-full m-[0_auto] h-[40px] mb-3xl flex flex-row flex-nowrap justify-start tablet:justify-center">
        <Link to="/">
          <LogoIcon className="h-[40px] fill-gray" />
        </Link>
      </section>
      <section className="max-w-[1400px] w-full m-[0_auto] flex flex-row flex-nowrap items-center justify-start pb-xl tablet:flex-col tablet:flex-wrap tablet:items-center">
        <div className="flex flex-initial flex-row flex-nowrap items-start mr-3xl tablet:m-zero tablet:items-center tablet:justify-center">
          {SocialMedia.map((item, index) => (
            <a
              key={index}
              href={item.link}
              rel="noopener noreferrer"
              target="_blank"
              className="inline-block w-[40px] h-[40px] p-sm mr-md fill-gray rounded hover:bg-black hover:bg-opacity-20"
            >
              {item.icon}
            </a>
          ))}
        </div>
        <div className="flex-initial tablet:w-full tablet:mt-2xl">
          <ul className="flex flex-row flex-nowrap items-start justify-start tablet:justify-center">
            <ListLink to="/about">{t('menu.about')}</ListLink>
            <ListLink to="/sources">{t('menu.sources')}</ListLink>
            <ListLink to="/support/terms-of-use">{t('menu.terms')}</ListLink>
            <ListLink to="/support/what-is-new">{t('menu.whatsnew')}</ListLink>
          </ul>
        </div>
      </section>
      <section className="max-w-[1400px] w-full m-[0_auto] pt-xl border-t border-[#374957] uppercase text-xs flex flex-col flex-nowrap justify-center leading-6 tablet:justify-center tablet:items-center tablet:text-center">
        <span>{t('footer.statement')}</span>
        <span>{t('footer.copyright', { year: new Date().getFullYear() })}</span>
      </section>
    </footer>
  )
}

export default Footer
