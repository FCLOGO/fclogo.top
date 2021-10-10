import React from 'react'
import { graphql } from 'gatsby'
import { useIntl } from 'react-intl'

import Layout from '../components/layout'
import Seo from '../components/seo'
import Hero from '../components/index-hero'
import LogoList from '../components/index-logo-list'
import RandomList from '../components/index-random'

import { mainContent } from './index.module.styl'

import app from 'gatsby-plugin-firebase-v9.0'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const IndexPage = ({ data, pageContext }) => {
  const intl = useIntl()
  const auth = getAuth(app)
  const email = 'info@fclogo.top'
  const password = 'Wkn(VsnBFf]x39xn4c2R'
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user
      console.log(user)
    })
    .catch(error => {
      const errorMessage = error.message
      console.log(errorMessage)
    })
  return (
    <Layout pageContext={pageContext}>
      <Seo title={intl.formatMessage({ id: 'home.title' })} />
      <Hero totalCount={data.allLogo.totalCount} locale={pageContext.locale} />
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
