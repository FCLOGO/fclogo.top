import React from 'react'
import { graphql, navigate } from 'gatsby'
import { Link, useTranslation } from 'gatsby-plugin-react-i18next'

import Layout from '../components/layout'
import Seo from '../components/seo'
import Search from '../components/_algolia'

import ArrowIcon from '../../static/assets/icons/arrowForward.inline.svg'
import ChevronIcon from '../../static/assets/icons/chevron.inline.svg'

// 文档导航
const NavItem = ({ item }) => {
  let children = null
  if (item.nodes && item.nodes.length) {
    children = (
      <ul className="block ml-sm py-sm mb-md border-l border-l-gray-1">
        {item.nodes.map(i => (
          <li key={i.childMarkdownRemark.frontmatter.title} className="mb-md">
            <Link
              to={`/support/${i.childMarkdownRemark.frontmatter.slug}`}
              className='aria-[current="page"]:border-l-[3px] aria-[current="page"]:font-semibold aria-[current="page"]:text-green text-ellipsis text-left pl-sm translate-x-[-2px] block overflow-hidden'
            >
              {i.childMarkdownRemark.frontmatter.title}
            </Link>
          </li>
        ))}
      </ul>
    )
  }
  return (
    <li>
      <h3 className="tracking-widest h-3xl inline-flex items-center">
        <ChevronIcon className="h-lg w-lg p-mini" />
        {item.fieldValue}
      </h3>
      {children}
    </li>
  )
}

const SupportTemplate = ({ data, pageContext }) => {
  const { t } = useTranslation()
  const group = data.allFile.group
  const sortBy = ['support', '帮助', 'terms', '条款', 'release', '发布']
  const customSort = ({ data, sortBy, sortField }) => {
    const sortByObject = sortBy.reduce(
      (obj, item, index) => ({
        ...obj,
        [item]: index
      }),
      {}
    )
    return data.sort((a, b) => sortByObject[a[sortField]] - sortByObject[b[sortField]])
  }
  return (
    <Layout>
      <div className="fixed top-header w-full bg-gray px-xl py-lg text-center border-b border-gray-1 z-30">
        <Search locale={pageContext.language} />
      </div>
      <div className="w-full m-[0_auto] flex-grow flex flex-col flex-wrap items-start pt-[200px]">
        {data.markdownRemark ? (
          <>
            <div className="w-full m-[0_auto] px-xl flex flex-row overflow-visible">
              <aside className="flex-none h-zero items-start block overflow-visible w-[260px] sticky top-[200px] tablet:hidden">
                <nav className="mb-3xl">
                  <button
                    onClick={() => navigate(-1)}
                    className="text-xs text-green cursor-pointer uppercase font-semibold h-3xl px-sm py-mini inline-flex items-center rounded hover:bg-light-green hover:bg-opacity-20"
                  >
                    <ArrowIcon className="h-lg w-lg rotate-180 mr-mini stroke-green" />
                    {t('support.back')}
                  </button>
                </nav>
                <nav className="text-xs uppercase max-h-[calc(-550px_+_100vh)] overflow-y-scroll">
                  <ul>
                    {customSort({
                      data: group,
                      sortBy: sortBy,
                      sortField: 'fieldValue'
                    }).map(g => (
                      <NavItem item={g} key={g.fieldValue} />
                    ))}
                  </ul>
                </nav>
              </aside>
              <div className="flex-grow max-w-[960px] m-[0_auto]">
                <article className="mb-[120px]">
                  <h1 className="text-3xl mb-xl font-bold">
                    {data.markdownRemark.frontmatter.title}
                  </h1>
                  <div className="flex flex-row justify-between items-start pt-xl">
                    <div
                      dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
                      className="flex-auto mr-3xl prose support-content"
                    />
                    <div className="flex-none w-[240px] sticky ml-3xl top-[200px] h-zero overflow-visible uppercase tablet:hidden">
                      {data.markdownRemark.tableOfContents ? (
                        <>
                          <h3 className="text-xs font-semibold tracking-widest h-3xl inline-flex items-center">
                            <ChevronIcon className="h-lg w-lg p-mini" />
                            {t('support.toc')}
                          </h3>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: data.markdownRemark.tableOfContents
                            }}
                            className="text-xs ml-sm pl-lg border-l border-l-gray-1 support-toc"
                          />
                        </>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </>
        ) : (
          <section className="w-full p-xl text-center pt-[160px] mt-[100px]">
            <p className="font-semibold text-light-gray">{t('detail.notrans')}</p>
          </section>
        )}
      </div>
    </Layout>
  )
}

export default SupportTemplate

export const Head = ({ data }) => {
  const locales = data.locales.edges[0].node.data
  let obj = undefined
  if (locales) {
    obj = JSON.parse(locales)
  }
  return (
    <>
      {data.markdownRemark ? (
        <Seo title={data.markdownRemark.frontmatter.title} />
      ) : (
        <Seo title={obj?.detailNotransTitle} />
      )}
    </>
  )
}

export const query = graphql`
  query ($language: String!, $slug: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    allFile(
      filter: {
        sourceInstanceName: { eq: "support" }
        childMarkdownRemark: { fields: { locale: { eq: $language } } }
      }
      sort: { childMarkdownRemark: { frontmatter: { mdxID: ASC } } }
    ) {
      group(field: { childMarkdownRemark: { frontmatter: { type: SELECT } } }) {
        fieldValue
        nodes {
          childMarkdownRemark {
            id
            frontmatter {
              title
              slug
            }
          }
        }
      }
    }
    markdownRemark(fields: { locale: { eq: $language } }, frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        slug
        title
      }
      html
      tableOfContents(maxDepth: 3)
    }
  }
`
