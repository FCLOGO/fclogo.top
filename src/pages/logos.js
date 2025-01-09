import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Seo from '../components/seo'
import ItemList from '../components/item-list'
import Search from '../components/_algolia'

const AllLogo = ({ data, pageContext }) => {
  return (
    <Layout>
      <div className="fixed top-header w-full bg-gray px-xl py-lg text-center border-b border-gray-1 z-30">
        <Search locale={pageContext.language} />
      </div>
      <ItemList allItems={data.allLogo.nodes} />
    </Layout>
  )
}

export default AllLogo

export const Head = ({ data, pageContext }) => {
  const locales = data.locales.edges[0].node.data
  const { i18n, language } = pageContext
  let obj = undefined
  if (locales) {
    obj = JSON.parse(locales)
  }
  return (
    <Seo
      title={`${obj?.logostitle} | ${obj?.hometitle}`}
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
    allLogo(sort: { logoID: DESC }, filter: { fields: { locale: { eq: $language } } }) {
      nodes {
        id
        slug
        version
        style
        isBgDark
        pngPath {
          childImageSharp {
            gatsbyImageData(width: 300, placeholder: BLURRED, formats: WEBP, layout: CONSTRAINED)
          }
        }
        detailInfo {
          info {
            fullName
            shortName
          }
          nation
          nationalInfo {
            id
            flag {
              childImageSharp {
                gatsbyImageData(width: 24, placeholder: BLURRED, formats: WEBP, layout: CONSTRAINED)
              }
            }
          }
        }
        internal {
          type
        }
      }
    }
  }
`
