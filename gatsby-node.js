const path = require(`path`)

exports.onCreateNode = ({ node, getNodesByType, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Logo') {
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
