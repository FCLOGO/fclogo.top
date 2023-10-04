import * as React from 'react'
import { Link } from 'gatsby'

import MainNav from './_header/main-nav'
import LogoIcon from '../../static/assets/icons/fclogo.inline.svg'
// import DonateIcon from '../../static/assets/icons/heart.inline.svg'

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-[99] bg-blue h-header px-lg border-b border-b-[rgba(255,255,255,0.1)] tablet:p-zero flex flex-row flex-nowrap justify-start items-center">
      <h1 className="flex-initial h-header p-zero tablet:mx-auto">
        <Link to="/" className="inline-block">
          <LogoIcon className="h-header py-md tablet:mr-[30px] fill-gray hover:fill-white" />
        </Link>
      </h1>
      <MainNav />
      {/* <Link
        to="/"
        className="desktop:p-[6px] desktop:rounded-sm desktop:hover:bg-dark-gray desktop:hover:bg-opacity-20"
      >
        <DonateIcon className="h-xl w-xl text-gray hover:text-white tablet:h-header tablet:w-header tablet:p-lg" />
      </Link> */}
    </header>
  )
}

export default Header
