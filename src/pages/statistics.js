import React from 'react'
import { useIntl } from 'react-intl'

import Layout from '../components/layout'
import Seo from '../components/seo'
import Search from '../components/single-search'

import { mainContent } from './statistics.module.styl'

const Statistics = ({ pageContext }) => {
  const intl = useIntl()
  return (
    <Layout pageContext={pageContext}>
      <Seo title={intl.formatMessage({ id: 'statistics.title' })} />
      <Search locale={pageContext.locale} />
      <div className={mainContent}>
        <h1>{intl.formatMessage({ id: 'statistics.subtitle' })}</h1>
      </div>
    </Layout>
  )
}

export default Statistics
