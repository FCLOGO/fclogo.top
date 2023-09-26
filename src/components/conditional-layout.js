import React from 'react'
import { Link } from 'gatsby'
import { ModalRoutingContext } from 'gatsby-plugin-modal-routing'

import Layout from './layout'
import Search from './_algolia'
import CloseIcon from '../../static/assets/icons/close.inline.svg'

const ConditionalLayout = ({ pageContext, children, ...rest }) => {
  return (
    <ModalRoutingContext.Consumer>
      {({ modal, closeTo }) =>
        modal ? (
          <React.Fragment>
            <Link to={closeTo}>
              <CloseIcon />
            </Link>
            {children}
          </React.Fragment>
        ) : (
          <Layout {...rest} pageContext={pageContext}>
            <div className="fixed top-header w-full bg-gray px-xl py-lg text-center border-b border-gray-1 z-30">
              <Search locale={pageContext.language} />
            </div>
            {children}
          </Layout>
        )
      }
    </ModalRoutingContext.Consumer>
  )
}

export default ConditionalLayout
