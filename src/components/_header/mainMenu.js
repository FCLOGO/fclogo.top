import React from 'react'
import { LocalizedLink } from 'gatsby-plugin-usei18n'

import HeaderToggle from './headerToggle'

import {
  mainMenuWrapper,
  mainMenuList,
  mainMenuListItem,
  mainMenuLink
} from './mainMenu.module.styl'

const ListLink = props => (
  <li className={mainMenuListItem}>
    <LocalizedLink className={mainMenuLink} to={props.to}>
      {props.children}
    </LocalizedLink>
  </li>
)

const MainMenu = ({ pageContext }) => {
  return (
    <div className={mainMenuWrapper}>
      <ul className={mainMenuList}>
        <ListLink to="/">About</ListLink>
        <ListLink to="/">News</ListLink>
        <ListLink to="/">More</ListLink>
      </ul>
      <HeaderToggle pageContext={pageContext} />
    </div>
  )
}

export default MainMenu
