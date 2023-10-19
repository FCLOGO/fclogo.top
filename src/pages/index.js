import * as React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Seo from '../components/seo'
import Hero from '../components/index-hero'
import LogoList from '../components/index-logo-list'
import LogoPack from '../components/index-pack'
import RandomList from '../components/index-random'

const IndexPage = ({ data, pageContext }) => {
  return (
    <Layout>
      <Hero
        totalCount={data.allLogo.totalCount}
        locale={pageContext.language}
        allLogo={data.allLogo.nodes}
      />
      <div className="w-full mx-auto mt-xl mb-[100px] px-[40px] max-w-[1400px] flex-auto flex flex-col flex-nowrap">
        <LogoList data={data} />
        {data.allLogoPack.nodes.length ? <LogoPack data={data} /> : ''}
        {data.allLogo.nodes.length > 50 ? <RandomList data={data} /> : ''}
      </div>
    </Layout>
  )
}

export default IndexPage

export const Head = ({ data }) => {
  const locales = data.locales.edges[0].node.data
  let obj = undefined
  if (locales) {
    obj = JSON.parse(locales)
  }
  return <Seo title={obj?.hometitle} />
}

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    allLogo(sort: { logoID: DESC }, filter: { fields: { locale: { eq: $language } } }) {
      nodes {
        id
        logoID
        sourceID
        slug
        style
        version
        pngPath {
          childImageSharp {
            gatsbyImageData(width: 500, placeholder: BLURRED, formats: WEBP, layout: CONSTRAINED)
          }
        }
        detailInfo {
          info {
            fullName
            shortName
            localName
          }
        }
      }
      totalCount
    }
    allLogoPack(
      sort: { packID: DESC }
      limit: 12
      filter: { fields: { locale: { eq: $language } } }
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
          detailInfo {
            info {
              fullName
            }
          }
        }
      }
    }
  }
`
