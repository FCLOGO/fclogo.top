import React from 'react'
import { useIntl } from 'react-intl'

import Layout from '../components/layout'
import Seo from '../components/seo'
import Header from '../components/header'
import Hero from '../components/hero'
import LatestLogos from '../components/latestLogos'
import Footer from '../components/footer'

import { container } from './index.module.styl'

const IndexPage = ({ pageContext }) => {
  const intl = useIntl()
  return (
    <Layout>
      <Seo title={intl.formatMessage({ id: 'home.title' })} />
      <Header pageContext={pageContext} />
      <Hero />
      <div className={container}>
        <LatestLogos />
      </div>
      <Footer />
    </Layout>
  )
}

export default IndexPage
