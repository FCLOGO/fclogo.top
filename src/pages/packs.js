import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Seo from '../components/seo'
import Search from '../components/_algolia'
import ItemList from '../components/item-list'

const Packs = ({ data, pageContext }) => {
  return (
    <Layout>
      <div className="fixed top-header w-full bg-gray px-xl py-lg text-center border-b border-gray-1 z-30">
        <Search locale={pageContext.language} />
      </div>
      <ItemList allItems={data.allLogoPack.nodes} />
    </Layout>
  )
}

export default Packs

export const Head = ({ data }) => {
  const locales = data.locales.edges[0].node.data
  let obj = undefined
  if (locales) {
    obj = JSON.parse(locales)
  }
  return <Seo title={obj?.packstitle} />
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
    allLogoPack(sort: { packID: DESC }, filter: { fields: { locale: { eq: $language } } }) {
      nodes {
        id
        slug
        name
        season
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
        internal {
          type
        }
      }
    }
  }
`
