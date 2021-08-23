const path = require(`path`)

exports.onCreateNode = ({ node, getNodesByType, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'logo') {
    const i18nNodes = getNodesByType(`SiteI18n`)
    const defaultLang = i18nNodes[0].defaultLang

    const fileNode = getNode(node.parent)
    const name = fileNode.name
    const isDefault = name === name.split(`.`)[0]
    const lang = isDefault ? defaultLang : name.split(`.`)[1]

    createNodeField({ node, name: `locale`, value: lang })
    createNodeField({ node, name: `isDefault`, value: isDefault })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allLogo {
        edges {
          node {
            slug
          }
          next {
            slug
          }
          previous {
            slug
          }
        }
      }
    }
  `)
  result.data.allLogo.edges.forEach(({ node, next, previous }) => {
    createPage({
      path: node.slug,
      component: path.resolve(`./src/templates/logoDetail.js`),
      context: {
        slug: node.slug,
        next,
        previous
      }
    })
  })
}

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    logo: {
      styleMode: {
        type: ['logo'],
        resolve: (source, args, context, info) => {
          return context.nodeModel.runQuery({
            query: {
              filter: {
                id: {
                  ne: source.id
                },
                sourceID: {
                  eq: source.sourceID
                },
                version: {
                  eq: source.version
                }
              }
            },
            type: 'logo'
          })
        }
      },
      logoHistory: {
        type: ['logo'],
        resolve: (source, args, context, info) => {
          return context.nodeModel.runQuery({
            query: {
              filter: {
                id: {
                  ne: source.id
                },
                sourceID: {
                  eq: source.sourceID
                },
                style: {
                  eq: 'color'
                }
              }
            },
            type: 'logo'
          })
        }
      },
      detailInfo: {
        type: [`sourceInfo`],
        resolve: (source, args, context, info) => {
          return context.nodeModel.runQuery({
            query: {
              filter: {
                sourceID: {
                  eq: source.sourceID
                }
              }
            },
            type: `sourceInfo`
          })
        }
      }
    }
  }
  createResolvers(resolvers)
}
