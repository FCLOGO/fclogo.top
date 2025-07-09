const escapeStringRegexp = require('escape-string-regexp')

const indexName = process.env.GATSBY_ALGOLIA_INDEX_NAME

const pageQuery = `{
  logos:allLogo {
    nodes {
      fields {
        uniqueID
      }
      slug
      verName
      version
      style
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
          gatsbyImageData(placeholder: BLURRED, formats: WEBP, layout: FIXED, width: 40)
        }
      }
    }
  }
}`

function pageToAlgoliaRecord({
  slug,
  fields,
  version,
  verName,
  style,
  detailInfo,
  league,
  pngPath,
  ...rest
}) {
  detailInfo[0].info[0].league ? (league = detailInfo[0].info[0].league) : ''
  verName ? verName : ''
  return {
    objectID: fields.uniqueID,
    slug,
    locale: fields.locale,
    version,
    verName,
    style,
    fullName: detailInfo[0].info[0].fullName,
    localName: detailInfo[0].info[0].localName,
    shortName: detailInfo[0].info[0].shortName,
    league,
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
      searchableAttributes: ['fullName', 'localName', 'shortName', 'verName', 'league'],
      attributesToSnippet: ['localName'],
      customRanking: [
        'desc(fullName)',
        'desc(localName)',
        'desc(shortName)',
        'desc(verName)',
        'desc(league)'
      ]
    }
  }
]

module.exports = queries
