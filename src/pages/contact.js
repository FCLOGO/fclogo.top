import React from 'react'
import { useIntl } from 'react-intl'

import Layout from '../components/layout'
import Seo from '../components/seo'
import PageHero from '../components/pageHero'

import { mainContent } from './contact.module.styl'

const ContactPage = ({ pageContext }) => {
  const intl = useIntl()
  return (
    <Layout pageContext={pageContext}>
      <Seo title={intl.formatMessage({ id: 'contact.title' })} />
      <PageHero pageSlogan={intl.formatMessage({ id: 'contact.slogan' }, { br: <br /> })} />
      <div className={mainContent}>
        <h1>{intl.formatMessage({ id: 'statistics.subtitle' })}</h1>
      </div>
    </Layout>
  )
}

export default ContactPage
