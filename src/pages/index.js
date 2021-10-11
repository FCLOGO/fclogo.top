import React from 'react'
import { graphql } from 'gatsby'
import { useIntl } from 'react-intl'

import Layout from '../components/layout'
import Seo from '../components/seo'
import Hero from '../components/index-hero'
import LogoList from '../components/index-logo-list'
import RandomList from '../components/index-random'

import { mainContent } from './index.module.styl'

import incrementViews from '../lib/increment-downloads'
import app from 'gatsby-plugin-firebase-v9.0'
import { getDatabase, ref, set } from 'firebase/database'
import {
  initializeAppCheck,
  ReCaptchaV3Provider,
  getToken,
  AppCheckToken,
  AppCheckTokenResult
} from 'firebase/app-check'

const IndexPage = ({ data, pageContext }) => {
  const intl = useIntl()
  const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(process.env.GATSBY_RECAPTCHA_SITE_KEY),
    isTokenAutoRefreshEnabled: true
  })
  getToken(appCheck)
    .then(() => {
      console.log('success')
    })
    .catch(error => {
      console.log(error.code)
    })

  const db = getDatabase(app)
  const Push = () => incrementViews('test')
  return (
    <Layout pageContext={pageContext}>
      <Seo title={intl.formatMessage({ id: 'home.title' })} />
      <Hero totalCount={data.allLogo.totalCount} locale={pageContext.locale} />
      <button onClick={Push}>PUSH</button>
      <div className={mainContent}>
        <LogoList data={data} />
        {data.allLogo.nodes.length > 50 ? <RandomList data={data} /> : ''}
      </div>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query ($locale: String!) {
    allLogo(
      sort: { order: DESC, fields: uniqueID }
      filter: { fields: { locale: { eq: $locale } } }
    ) {
      nodes {
        id
        style
        pngPath {
          childImageSharp {
            gatsbyImageData(width: 500, placeholder: BLURRED, formats: WEBP, layout: CONSTRAINED)
          }
        }
        slug
        detailInfo {
          info {
            fullName
            shortName
          }
        }
      }
      totalCount
    }
  }
`
