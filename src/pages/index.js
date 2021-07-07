import React from 'react'
import { useIntl } from 'react-intl'

import Layout from '../components/layout'
import Seo from '../components/seo'
import Header from '../components/header'

const IndexPage = ({ pageContext }) => {
  const intl = useIntl()
  return (
    <Layout>
      <Seo title={intl.formatMessage({ id: 'homeTitle' })} />
      <Header pageContext={pageContext} />
    </Layout>
  )
}

export default IndexPage
