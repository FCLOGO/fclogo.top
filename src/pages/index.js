import React from 'react'
import { graphql } from 'gatsby'
import { useIntl } from 'react-intl'

import Layout from '../components/layout'
import Seo from '../components/seo'
import Header from '../components/header'
import Hero from '../components/hero'
import LogoList from '../components/indexLogoList'
import Footer from '../components/footer'

import { container } from './index.module.styl'

const IndexPage = ({ data, pageContext }) => {
  const intl = useIntl()
  return (
    <Layout>
      <Seo title={intl.formatMessage({ id: 'home.title' })} />
      <Header pageContext={pageContext} />
      <Hero totalCount={data.allLogo.totalCount} />
      <div className={container}>
        <LogoList data={data} />
      </div>
      <Footer />
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query ($locale: String!) {
    allLogo(limit: 12, filter: { fields: { locale: { eq: $locale } } }) {
      nodes {
        logoPath {
          childImageSharp {
            gatsbyImageData(width: 500, placeholder: BLURRED)
          }
        }
        uniqueID
        fullName
        shortName
        fileFormat
        slug
      }
      totalCount
    }
  }
`
