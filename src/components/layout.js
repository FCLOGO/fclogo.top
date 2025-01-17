import * as React from 'react'

import Header from './header'
import Footer from './footer'

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <main className="flex flex-col h-screen">
        <Header />
        {children}
        <Footer />
      </main>
    </React.Fragment>
  )
}

export default Layout
