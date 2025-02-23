import React from 'react'
import { Link, useTranslation } from 'gatsby-plugin-react-i18next'

import LanguageSwitcher from '../_header/language-switcher'

const MenuLink = props => (
  <li className="tablet:w-full">
    <Link
      to={props.to}
      className="relative uppercase inline-block ml-lg text-gray hover:text-white font-medium tracking-widest tablet:w-full tablet:h-[48px] tablet:leading-[48px] tablet:text-dark-gray tablet:hover:text-dark-gray"
    >
      {props.children}
    </Link>
  </li>
)

const MainMenu = () => {
  const { t } = useTranslation()
  return (
    <div className="overflow-visible flex flex-row flex-nowrap justify-between h-header flex-auto tablet:flex-col tablet:overflow-x-hidden tablet:overflow-y-auto tablet:h-full tablet:justify-start">
      <ul className="flex felx-auto flex-row flex-nowrap items-center tablet:flex-col tablet:px-xxl tablet:mb-xxl">
        <MenuLink to="/logos">{t('menu.logo')}</MenuLink>
        <MenuLink to="/packs">{t('menu.pack')}</MenuLink>
        <MenuLink to="/logomap">{t('menu.map')}</MenuLink>
        <MenuLink to="/contribution">{t('menu.contribution')}</MenuLink>
        <MenuLink to="/links">{t('menu.links')}</MenuLink>
        <MenuLink to="/about">{t('menu.about')}</MenuLink>
      </ul>
      <LanguageSwitcher />
    </div>
  )
}

export default MainMenu
