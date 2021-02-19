import React from 'react'
import 'normalize.css'
import layoutStyles from '../styles/_partial/layout.module.styl'

export default function Layout({ children }) {
  return <div className={layoutStyles.container}>{children}</div>
}
