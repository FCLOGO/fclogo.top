const path = require(`path`)

// 为数据文件添加'locale'节点
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  // 默认语言设置为英语
  const defaultLang = 'en'

  if (
    node.internal.type === 'logo' ||
    node.internal.type === 'sourceInfo' ||
    node.internal.type === 'logoPack' ||
    node.internal.type === 'MarkdownRemark'
  ) {
    // 通过父节点获取文件名
    const name = getNode(node.parent).name

    // 判断是否为默认语言
    const isDefault = name === name.split(`.`)[0]

    // 获取语言类型，如果是默认语言则为'en'，否则从文件名中获取
    const lang = isDefault ? defaultLang : name.split(`.`)[1]

    // 创建节点字段并设置'locale'字段值
    createNodeField({ node, name: `locale`, value: lang })
    createNodeField({ node, name: `isDefault`, value: isDefault })

    // 为 logo 添加 `logoID` 字段
    if (node.internal.type === 'logo') {
      // 获取 `logoID`
      const logoID = node.logoID
      // 创建唯一ID字段
      const uniqueID = `${lang}-${logoID}`

      // 创建节点字段并设置'uniqueID'字段值
      createNodeField({ node, name: `uniqueID`, value: uniqueID })
    }
  }
}

// 为字段添加自定义解析器
exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    logo: {
      // LOGO的其他样式类型
      otherStyle: {
        type: ['logo'],
        resolve: async (source, args, context, info) => {
          const { entries } = await context.nodeModel.findAll({
            query: {
              filter: {
                id: { ne: source.id }, // 排除当前 LOGO
                fields: {
                  locale: { eq: source.fields.locale } // 匹配页面语言
                },
                sourceID: { eq: source.sourceID }, // 匹配主体 ID
                version: { eq: source.version } // LOGO 版本相同
              }
            },
            type: 'logo'
          })
          return entries
        }
      },

      // LOGO 时间线（历史）
      logoTimeline: {
        type: ['logo'],
        resolve: async (source, args, context, info) => {
          const { entries } = await context.nodeModel.findAll({
            query: {
              filter: {
                fields: {
                  locale: { eq: source.fields.locale } // 匹配页面语言
                },
                sourceID: { eq: source.sourceID }, // 匹配主体ID
                style: { eq: 'color' } // 仅匹配'color'样式
              }
            },
            type: 'logo'
          })
          return entries
        }
      },

      // LOGO 主体详细信息
      detailInfo: {
        type: ['sourceInfo'],
        resolve: async (source, args, context, info) => {
          const { entries } = await context.nodeModel.findAll({
            query: {
              filter: {
                sourceID: { eq: source.sourceID }, // 匹配主体ID
                fields: {
                  locale: { eq: source.fields.locale } // 匹配页面语言
                }
              }
            },
            type: 'sourceInfo'
          })
          return entries
        }
      },

      // LOGO 贡献者
      contributorInfo: {
        type: ['contributor'],
        resolve: async (source, args, context, info) => {
          const { entries } = await context.nodeModel.findAll({
            query: {
              filter: {
                ctrbID: { eq: source.ctrbID } // 匹配贡献都ID
              }
            },
            type: 'contributor'
          })
          return entries
        }
      }
    },

    logoPack: {
      // 徽标集合信息
      packInfo: {
        type: ['logo'],
        resolve: async (source, args, context, info) => {
          const { entries } = await context.nodeModel.findAll({
            query: {
              filter: {
                fields: {
                  locale: { eq: source.fields.locale } // 匹配页面语言
                },
                sourceID: { eq: source.packSource }, // 匹配主体ID
                style: { eq: 'color' } // 仅匹配 color 样式
              }
            },
            type: 'logo'
          })
          return entries
        }
      },

      // 集合包含的项目信息
      itemsInfo: {
        type: ['logo'],
        resolve: async (source, args, context, info) => {
          const { entries } = await context.nodeModel.findAll({
            query: {
              filter: {
                fields: {
                  locale: { eq: source.fields.locale } // 匹配页面语言
                },
                style: { eq: 'color' } // 仅匹配 color 样式
              }
            },
            type: `logo`
          })
          const items = entries.filter(item => {
            // 根据主体 ID 与徽标 version 匹配徽标
            return source.items.some(i => i.id === item.sourceID && i.version === item.version)
          })
          return items
        }
      }
    },

    // 为徽标主体信息添加 徽标数量 与 最新版本 字段
    sourceInfo: {
      // 添加主体包含 徽标数量 字段
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
      },
      // 添加主体最新徽标版本字段
      latestVersion: {
        type: `Float`,
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
          const versions = Array.from(entries).map(({ version }) => version)
          return Math.max(...versions)
        }
      }
    }
  }

  createResolvers(resolvers)
}

// 创建 LOGO && PACK 详情页面
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  // 创建 LOGO 详情页
  const logoDetail = await graphql(`
    query {
      allLogo(filter: { fields: { locale: { eq: "en" } } }, sort: { logoID: ASC }) {
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

  // 创建 LOGO PACKS 页面
  const logoPacks = await graphql(`
    query {
      allLogoPack(sort: { packID: ASC }, filter: { fields: { locale: { eq: "en" } } }) {
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

  // 创建 Documents 页面
  const support = await graphql(`
    query {
      allMarkdownRemark {
        nodes {
          frontmatter {
            slug
          }
        }
      }
    }
  `)

  if (logoDetail.errors) {
    reporter.panicOnBuild(logoDetail.errors)
    return
  }

  if (logoPacks.errors) {
    reporter.panicOnBuild(logoPacks.errors)
    return
  }

  if (support.errors) {
    reporter.panicOnBuild(support.errors)
    return
  }

  // 创建 LOGO 详情页
  logoDetail.data.allLogo.edges.forEach(({ node, next, previous }) => {
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

  // 创建 LOGO PACKS 页面
  logoPacks.data.allLogoPack.edges.forEach(({ node, next, previous }) => {
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

  // 创建 Documents 页面
  support.data.allMarkdownRemark.nodes.forEach(node => {
    createPage({
      path: `/support/${node.frontmatter.slug}`,
      component: path.resolve(`./src/templates/support.js`),
      context: {
        slug: node.frontmatter.slug
      }
    })
  })
}
