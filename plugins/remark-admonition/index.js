const visit = require('unist-util-visit')
const toHast = require('mdast-util-to-hast')
const hastToHtml = require('hast-util-to-html')
const { noteIcon, tipsIcon, warnIcon } = require('./icons')

module.exports = async ({ markdownAST }) => {
  visit(markdownAST, 'paragraph', (node, index, parent) => {
    const { children } = node
    if (children.length > 0 && children[0].type === 'text') {
      const firstText = children[0].value.trim()
      if (firstText.startsWith(':::')) {
        // 获取关键字
        const keyword = firstText.slice(3, 7).trim().toUpperCase()
        const validKeywords = ['NOTE', 'TIPS', 'WARN']

        if (validKeywords.includes(keyword)) {
          const contentChildren = []

          // 从下一个节点开始，直到找到结束标记
          let endIndex = null
          for (let i = index; i < parent.children.length; i++) {
            const childNode = parent.children[i]

            if (childNode.type === 'paragraph') {
              const paraText = childNode.children
                .map(c => c.value)
                .join('')
                .trim()

              // 删除段落的开始标记
              if (paraText.startsWith(':::')) {
                childNode.children = childNode.children.map(c => {
                  if (c.type === 'text' && c.value.startsWith(':::')) {
                    return { ...c, value: c.value.slice(7).trim() }
                  }
                  return c
                })
              }

              // 检查段落是否包含结束标记
              if (paraText.endsWith(':::')) {
                endIndex = i // 记录结束索引
                const trimmedChild = {
                  ...childNode,
                  children: childNode.children.map(c => {
                    if (c.type === 'text' && c.value.endsWith(':::')) {
                      return { ...c, value: c.value.slice(0, -3).trim() }
                    }
                    return c
                  })
                }
                contentChildren.push(trimmedChild)
                break // 找到结束标记后退出
              } else {
                // 收集段落内容
                contentChildren.push(childNode)
              }
            } else {
              // 碰到非段落类型的节点，退出
              break
            }
          }

          const contentNode = {
            type: 'root',
            children: contentChildren
          }

          // 将 MDAST 转换为 HAST
          const hastNode = toHast(contentNode)
          const contentHtml = hastToHtml(hastNode) // 使用 HAST 转换为 HTML

          // 构建 HTML 结点
          const admonitionHtml = `
            <section class="admonition admonition-${keyword.toLowerCase()}">
              <p class="admonition-title">
                ${keyword === 'NOTE' ? noteIcon : keyword === 'TIPS' ? tipsIcon : warnIcon}
                ${keyword}
              </p>
              <section class="admonition-content">${contentHtml}</section>
            </section>
          `
          parent.children.splice(index, endIndex - index + 1, {
            type: 'html',
            value: admonitionHtml
          })
        }
      }
    }
  })
  return markdownAST
}
