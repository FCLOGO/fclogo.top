import * as React from 'react'
import { useIntl } from 'react-intl'
import { LocalizedLink } from 'gatsby-plugin-usei18n'

import Layout from '../components/layout'
import Seo from '../components/seo'
import Search from '../components/single-search'

import ArrowIcon from '../../static/assets/icons/arrowForward.inline.svg'

import { mainContent, title, subtitle, description, backLink } from './404.module.styl'

const NotFoundPage = ({ pageContext }) => {
  const intl = useIntl()
  return (
    <Layout pageContext={pageContext}>
      <Seo title={intl.formatMessage({ id: 'home.notFound' })} />
      <Search locale={pageContext.locale} />
      <div className={mainContent}>
        <h1 className={title}>404</h1>
        <h2 className={subtitle}>{intl.formatMessage({ id: 'home.ooops' })}</h2>
        <p className={description}>{intl.formatMessage({ id: 'home.notFoundText' })}</p>
        <LocalizedLink to="/" className={backLink}>
          <ArrowIcon />
          <span>{intl.formatMessage({ id: 'home.backHome' })}</span>
        </LocalizedLink>
      </div>
    </Layout>
  )
}

export default NotFoundPage
