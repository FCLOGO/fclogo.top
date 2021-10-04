import * as React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { MdxLink } from 'gatsby-plugin-usei18n'
import Header from './header'
import Footer from './footer'

import 'normalize.css'
import { container } from './layout.module.styl'

const components = {
  a: MdxLink
}

const Layout = ({ pageContext, children }) => {
  return (
    <React.Fragment>
      <main className={container}>
        <MDXProvider components={components}>
          <Header pageContext={pageContext} />
          {children}
          <Footer />
        </MDXProvider>
      </main>
    </React.Fragment>
  )
}

export default Layout
