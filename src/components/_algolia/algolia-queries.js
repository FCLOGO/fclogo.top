const escapeStringRegexp = require('escape-string-regexp')

const indexName = process.env.GATSBY_ALGOLIA_INDEX_NAME

const pageQuery = `{
  logos:allLogo {
    nodes {
      id
      slug
      fields {
        locale
      }
      detailInfo {
        info {
          fullName
          localName
          shortName
          league
        }
      }
      pngPath {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, formats: WEBP, layout: FULL_WIDTH)
        }
      }
    }
  }
}`

function pageToAlgoliaRecord({ id, slug, fields, detailInfo, pngPath, ...rest }) {
  return {
    objectID: id,
    slug,
    locale: fields.locale,
    fullName: detailInfo[0].info[0].fullName[1],
    localName: detailInfo[0].info[0].localName[1],
    shortName: detailInfo[0].info[0].shortName[1],
    league: detailInfo[0].info[0].league[1],
    pngPath,
    ...rest
  }
}

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => data.logos.nodes.map(pageToAlgoliaRecord),
    indexName,
    settings: {
      hitsPerPage: 10,
      attributesForFaceting: ['filterOnly(locale)'],
      searchableAttributes: ['fullName', 'localName', 'shortName', 'league'],
      attributesToSnippet: ['localName'],
      customRanking: ['desc(fullName)', 'desc(localName)', 'desc(shortName)', 'desc(league)']
    }
  }
]

module.exports = queries
