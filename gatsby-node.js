const path = require(`path`)
const { execSync } = require('child_process')

exports.onCreateNode = ({ node, getNodesByType, getNode, actions }) => {
  const { createNodeField } = actions

  if (
    node.internal.type === 'logo' ||
    node.internal.type === 'sourceInfo' ||
    node.internal.type === 'logoPack' ||
    node.internal.type === 'statistics'
  ) {
    const i18nNodes = getNodesByType(`SiteI18n`)
    const defaultLang = i18nNodes[0].defaultLang

    const fileNode = getNode(node.parent)
    const name = fileNode.name
    const isDefault = name === name.split(`.`)[0]
    const lang = isDefault ? defaultLang : name.split(`.`)[1]

    createNodeField({ node, name: `locale`, value: lang })
    createNodeField({ node, name: `isDefault`, value: isDefault })
  }

  if (node.internal.type === 'Mdx') {
    const gitAuthorTime = execSync(
      `git log -1 --pretty=format:%ad --date=format:"%Y-%m-%d @%H:%M:%S" ${node.fileAbsolutePath}`
    ).toString()

    createNodeField({ node, name: `gitAuthorTime`, value: gitAuthorTime })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const detail = await graphql(`
    query {
      allLogo(sort: { fields: uniqueID }, filter: { fields: { locale: { eq: "en" } } }) {
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
  const support = await graphql(`
    {
      support: allFile(filter: { sourceInstanceName: { eq: "support" } }) {
        nodes {
          childMdx {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `)
  const packs = await graphql(`
    query {
      allLogoPack(sort: { fields: uniqueID }, filter: { fields: { locale: { eq: "en" } } }) {
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

  if (detail.errors) {
    reporter.panicOnBuild(detail.errors)
    return
  }

  if (support.errors) {
    reporter.panicOnBuild(support.errors)
    return
  }

  if (packs.errors) {
    reporter.panicOnBuild(support.errors)
    return
  }

  detail.data.allLogo.edges.forEach(({ node, next, previous }) => {
    createPage({
      path: node.slug,
      component: path.resolve(`./src/templates/logo-detail.js`),
      context: {
        slug: node.slug,
        next,
        previous
      }
    })
  })

  packs.data.allLogoPack.edges.forEach(({ node, next, previous }) => {
    createPage({
      path: node.slug,
      component: path.resolve(`./src/templates/pack-detail.js`),
      context: {
        slug: node.slug,
        next,
        previous
      }
    })
  })

  support.data.support.nodes.forEach(({ childMdx: node }) => {
    createPage({
      path: `/support/${node.frontmatter.slug}`,
      component: path.resolve(`./src/templates/support.js`),
      context: {
        slug: node.frontmatter.slug
      }
    })
  })
}

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    logo: {
      styleMode: {
        type: ['logo'],
        resolve: async (source, args, context, info) => {
          const { entries } = await context.nodeModel.findAll({
            query: {
              filter: {
                id: { ne: source.id },
                fields: {
                  locale: { eq: source.fields.locale }
                },
                sourceID: { eq: source.sourceID },
                version: { eq: source.version }
              }
            },
            type: 'logo'
          })
          return entries
        }
      },
      logoHistory: {
        type: ['logo'],
        resolve: async (source, args, context, info) => {
          const { entries } = await context.nodeModel.findAll({
            query: {
              filter: {
                // version: {
                //   ne: source.version
                // },
                fields: {
                  locale: { eq: source.fields.locale }
                },
                sourceID: { eq: source.sourceID },
                style: { eq: 'color' }
              }
            },
            type: 'logo'
          })
          return entries
        }
      },
      detailInfo: {
        type: [`sourceInfo`],
        resolve: async (source, args, context, info) => {
          const { entries } = await context.nodeModel.findAll({
            query: {
              filter: {
                sourceID: { eq: source.sourceID },
                fields: {
                  locale: { eq: source.fields.locale }
                }
              }
            },
            type: `sourceInfo`
          })
          return entries
        }
      }
    },
    sourceInfo: {
      logoCount: {
        type: `Int`,
        resolve: async (source, args, context, info) => {
          const { entries } = await context.nodeModel.findAll({
            query: {
              filter: {
                sourceID: { eq: source.sourceID },
                fields: {
                  locale: { eq: source.fields.locale }
                }
              }
            },
            type: `logo`
          })
          return Array.from(entries).length
        }
      }
    },
    logoPack: {
      packInfo: {
        type: ['logo'],
        resolve: async (source, args, context, info) => {
          const { entries } = await context.nodeModel.findAll({
            query: {
              filter: {
                fields: {
                  locale: { eq: source.fields.locale }
                },
                sourceID: { eq: source.packSource },
                style: { eq: `color` }
              }
            },
            type: `logo`
          })
          return entries
        }
      },
      itemsInfo: {
        type: ['logo'],
        resolve: async (source, args, context, info) => {
          const { entries } = await context.nodeModel.findAll({
            query: {
              filter: {
                fields: {
                  locale: { eq: source.fields.locale }
                },
                style: { eq: `color` }
              }
            },
            type: `logo`
          })
          const items = entries.filter(item => {
            return source.items.some(i => i.id === item.sourceID && i.version === item.version)
          })
          return items
        }
      }
    }
  }
  createResolvers(resolvers)
}
