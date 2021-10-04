import React from 'react'

import MainMenu from './main-menu'
import MenuIcon from '../../../static/assets/icons/menu.inline.svg'
import CloseIcon from '../../../static/assets/icons/close.inline.svg'

import {
  mainNavWrapper,
  tabletMenuToggle,
  menuIcon,
  mainMenuInput,
  mainMenu,
  mainMenuModal,
  mainMenuClose,
  closeIcon
} from './main-nav.module.styl'

const MainNav = ({ pageContext }) => {
  return (
    <nav className={mainNavWrapper}>
      <label htmlFor="main-menu-toggle" className={tabletMenuToggle}>
        <MenuIcon className={menuIcon} />
      </label>
      <input type="checkbox" id="main-menu-toggle" className={mainMenuInput} />
      <div className={mainMenu} id="main-menu">
        <label htmlFor="main-menu-toggle" className={mainMenuModal}></label>
        <label htmlFor="main-menu-toggle" className={mainMenuClose}>
          <CloseIcon className={closeIcon} />
        </label>
        <MainMenu pageContext={pageContext} />
      </div>
    </nav>
  )
}

export default MainNav
