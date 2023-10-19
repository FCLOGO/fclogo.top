import React from 'react'
import { Link } from 'gatsby'
import { ModalRoutingContext } from 'gatsby-plugin-modal-routing-v5.0'

import Layout from './layout'
import Search from './_algolia'

import CloseIcon from '../../static/assets/icons/close.inline.svg'

const ConditionalLayout = ({ pageContext, allLogo, children, ...rest }) => {
  return (
    <ModalRoutingContext.Consumer>
      {({ modal, closeTo }) =>
        modal ? (
          <React.Fragment>
            <Link
              to={closeTo}
              className="w-[50px] h-[50px] p-md fixed top-3xl right-[50px] hover:bg-green hover:bg-opacity-50 text-white rounded-[50%]"
            >
              <CloseIcon />
            </Link>
            {children}
          </React.Fragment>
        ) : (
          <Layout {...rest}>
            <div className="fixed top-header w-full bg-gray px-xl py-lg text-center border-b border-gray-1 z-30">
              <Search locale={pageContext.language} allLogo={allLogo} />
            </div>
            {children}
          </Layout>
        )
      }
    </ModalRoutingContext.Consumer>
  )
}

export default ConditionalLayout
