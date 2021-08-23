import React from 'react'
import { graphql } from 'gatsby'
import { useIntl } from 'react-intl'

import Layout from '../components/layout'
import Seo from '../components/seo'
import Hero from '../components/indexHero'
import LogoList from '../components/indexLogoList'

import { mainContent } from './index.module.styl'

const IndexPage = ({ data, pageContext }) => {
  const intl = useIntl()
  return (
    <Layout pageContext={pageContext}>
      <Seo title={intl.formatMessage({ id: 'home.title' })} />
      <Hero totalCount={data.allLogo.totalCount} />
      <div className={mainContent}>
        <LogoList data={data} />
      </div>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query ($locale: String!) {
    allLogo(
      sort: { order: DESC, fields: pngPath___birthTime }
      limit: 12
      filter: { fields: { locale: { eq: $locale } } }
    ) {
      nodes {
        id
        pngPath {
          childImageSharp {
            gatsbyImageData(width: 500, placeholder: BLURRED, formats: WEBP)
          }
        }
        fileFormat
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
