import React from 'react'
import { graphql } from 'gatsby'
import { useIntl } from 'react-intl'

import Layout from '../components/layout'
import Seo from '../components/seo'
import Hero from '../components/index-hero'
import LogoList from '../components/index-logo-list'
import RandomList from '../components/index-random'
import LogoPacks from '../components/index-packs'

import { mainContent } from './index.module.styl'

const IndexPage = ({ data, pageContext }) => {
  const intl = useIntl()
  return (
    <Layout pageContext={pageContext}>
      <Seo title={intl.formatMessage({ id: 'home.title' })} />
      <Hero totalCount={data.allLogo.totalCount} locale={pageContext.locale} />
      <div className={mainContent}>
        <LogoList data={data} />
        <LogoPacks data={data} />
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
    allLogoPack(
      sort: { order: DESC, fields: uniqueID }
      limit: 12
      filter: { fields: { locale: { eq: $locale } } }
    ) {
      nodes {
        id
        name
        season
        slug
        packInfo {
          pngPath {
            childImageSharp {
              gatsbyImageData(width: 50, placeholder: BLURRED, formats: WEBP, layout: CONSTRAINED)
            }
          }
        }
        itemsInfo {
          sourceID
          pngPath {
            childImageSharp {
              gatsbyImageData(width: 200, placeholder: BLURRED, formats: WEBP, layout: CONSTRAINED)
            }
          }
        }
      }
    }
  }
`
