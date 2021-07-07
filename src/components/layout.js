import * as React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { MdxLink, LocalizedLink, LocaleContext } from 'gatsby-plugin-usei18n'

import 'normalize.css'
import { container } from './layout.module.styl'

const components = {
  a: MdxLink
}

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <main className={container}>
        <MDXProvider components={components}>{children}</MDXProvider>
      </main>
    </React.Fragment>
  )
}

export default Layout
