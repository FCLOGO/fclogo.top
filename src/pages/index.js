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
      <Hero totalCount={data.allLogo.totalCount} locale={pageContext.language} />
      <div className="w-full mx-auto mt-xl mb-[100px] px-[40px] max-w-[1400px] flex-auto flex flex-col flex-nowrap">
        <LogoList data={data} />
        {data.allLogoPack.nodes.length ? <LogoPack data={data} /> : ''}
        {/* {data.allLogo.nodes.length > 50 ? <RandomList data={data} /> : ''} */}
      </div>
    </Layout>
  )
}

export default IndexPage

export const Head = ({ data, pageContext }) => {
  const locales = data.locales.edges[0].node.data
  const { i18n, language } = pageContext
  let obj = undefined
  if (locales) {
    obj = JSON.parse(locales)
  }
  return (
    <Seo
      title={obj?.hometitle}
      description={obj?.indexDescription}
      path={i18n.path}
      locale={language}
      languages={i18n.languages}
      originalPath={i18n.originalPath}
    />
  )
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
    allLogo(sort: { logoID: DESC }, limit: 12, filter: { fields: { locale: { eq: $language } } }) {
      nodes {
        id
        slug
        style
        isBgDark
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
          }
          nation
          nationalInfo {
            flag {
              childImageSharp {
                gatsbyImageData(width: 24, placeholder: BLURRED, formats: WEBP, layout: CONSTRAINED)
              }
            }
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
