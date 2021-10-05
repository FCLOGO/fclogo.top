import React from 'react'
import { LocalizedLink } from 'gatsby-plugin-usei18n'
import { useMediaQuery } from 'react-responsive'

const ModalLink = ({ state, children, ...rest }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 })
  return isDesktop ? (
    <LocalizedLink state={state} {...rest}>
      {children}
    </LocalizedLink>
  ) : (
    <LocalizedLink {...rest}>{children}</LocalizedLink>
  )
}

export default ModalLink
