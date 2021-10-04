import React from 'react'
import { Link } from 'gatsby'
import { ModalRoutingContext } from 'gatsby-plugin-modal-routing-3'
import Layout from './layout'
import Search from './single-search'

import CloseIcon from '../../static/assets/icons/close.inline.svg'

const ConditionalLayout = ({ pageContext, children, ...rest }) => {
  return (
    <ModalRoutingContext.Consumer>
      {({ modal, closeTo }) =>
        modal ? (
          <React.Fragment>
            <Link to={closeTo} className="modal_close-link">
              <CloseIcon />
            </Link>
            {children}
          </React.Fragment>
        ) : (
          <Layout {...rest} pageContext={pageContext}>
            <Search locale={pageContext.locale} />
            {children}
          </Layout>
        )
      }
    </ModalRoutingContext.Consumer>
  )
}

export default ConditionalLayout
