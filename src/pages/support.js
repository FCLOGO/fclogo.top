import React from 'react'
import { useIntl } from 'react-intl'

import Layout from '../components/layout'
import Seo from '../components/seo'
import PageHero from '../components/pageHero'

import { mainContent, inner, separator, linkWrapper } from './support.module.styl'

const SupportPage = ({ pageContext }) => {
  const intl = useIntl()
  return (
    <Layout pageContext={pageContext}>
      <Seo title={intl.formatMessage({ id: 'sponsor.title' })} />
      <PageHero pageSlogan={intl.formatMessage({ id: 'sponsor.slogan' }, { br: <br /> })} />
      <div className={mainContent}>
        <section>
          <div className={inner}>
            <h2>{intl.formatMessage({ id: 'sponsor.title' })}</h2>
            <span className={separator}></span>
            <div className={linkWrapper}>
              <div></div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default SupportPage
