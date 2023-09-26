import React from 'react'
import { Link } from 'gatsby-plugin-react-i18next'
import { useMediaQuery } from 'react-responsive'

const ModalLink = ({ state, children, ...rest }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 })
  return isDesktop ? (
    <Link state={state} {...rest}>
      {children}
    </Link>
  ) : (
    <Link {...rest}>{children}</Link>
  )
}

export default ModalLink
