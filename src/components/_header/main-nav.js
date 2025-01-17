import React from 'react'

import MainMenu from './main-menu'
import MenuIcon from '../../../static/assets/icons/menu.inline.svg'
import CloseIcon from '../../../static/assets/icons/close.inline.svg'

const MainNav = () => {
  return (
    <nav className="flex-1 tablet:flex-none tablet:order-first tablet:w-header tablet:h-header">
      <label
        htmlFor="main-menu-toggle"
        className="hidden m-0 w-header h-header tablet:inline-block"
      >
        <MenuIcon className="w-header h-header text-center p-lg text-gray hover:text-white cursor-pointer" />
      </label>
      <input type="checkbox" id="main-menu-toggle" className="hidden appearance-none peer" />
      <div
        id="main-menu"
        className="tablet:hidden tablet:peer-checked:block tablet:fixed tablet:top-zero tablet:left-zero tablet:w-[320px] tablet:h-full tablet:bg-white tablet:z-[100]"
      >
        <label
          htmlFor="main-menu-toggle"
          className="desktop:hidden block fixed top-zero left-[320px] h-full w-[calc(100%-320px)] bg-modal tablet:z-20"
        ></label>
        <label htmlFor="main-menu-toggle" className="hidden m-zero h-header tablet:block">
          <CloseIcon className="text-dark-gray w-header h-header text-center p-lg cursor-pointer" />
        </label>
        <MainMenu />
      </div>
    </nav>
  )
}

export default MainNav
