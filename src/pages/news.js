import React from 'react'
import { useIntl } from 'react-intl'

import Layout from '../components/layout'
import Seo from '../components/seo'
import PageHero from '../components/page-hero'

import { mainContent, inner, separator } from './news.module.styl'

const NewsPage = ({ pageContext }) => {
  const intl = useIntl()
  return (
    <Layout pageContext={pageContext}>
      <Seo title={intl.formatMessage({ id: 'news.title' })} />
      <PageHero pageSlogan={intl.formatMessage({ id: 'news.slogan' }, { br: <br /> })} />
      <div className={mainContent}>
        <section>
          <div className={inner}>
            <h2>{intl.formatMessage({ id: 'statistics.subtitle' })}</h2>
            <span className={separator}></span>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default NewsPage
