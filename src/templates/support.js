import React from 'react'
import { graphql, navigate } from 'gatsby'
import { LocalizedLink } from 'gatsby-plugin-usei18n'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { useIntl } from 'react-intl'

import Layout from '../components/layout'
import Seo from '../components/seo'
import Search from '../components/singleSearch'

import ArrowIcon from '../../static/assets/icons/arrowForward.inline.svg'
import ChevronIcon from '../../static/assets/icons/chevron.inline.svg'
import CheckMark from '../../static/assets/icons/checkmark.inline.svg'

import {
  mainContent,
  container,
  content,
  supportArticle,
  articleTitle,
  separator,
  articleWrapper,
  articleContent,
  updateTime,
  articleToc,
  sidebar,
  sidebarInner,
  backButton,
  backNav,
  supportNav,
  navList,
  notransText
} from './support.module.styl'

const NavItem = ({ item }) => {
  let children = null
  if (item.nodes && item.nodes.length) {
    children = (
      <ul>
        {item.nodes.map(i => (
          <li key={i.childMdx.frontmatter.title}>
            <LocalizedLink to={`/support/${i.childMdx.frontmatter.slug}`}>
              {i.childMdx.frontmatter.title}
            </LocalizedLink>
          </li>
        ))}
      </ul>
    )
  }
  return (
    <li>
      <h3>
        <ChevronIcon />
        {item.fieldValue}
      </h3>
      {children}
    </li>
  )
}

const ListItem = ({ item }) => {
  let children = null
  if (item.items && item.items.length) {
    children = (
      <ul>
        {item.items.map(i => (
          <ListItem item={i} key={i.title} />
        ))}
      </ul>
    )
  }
  return (
    <li>
      <a href={item.url}>{item.title}</a>
      {children}
    </li>
  )
}

const SupportTemplate = ({ data, pageContext }) => {
  const intl = useIntl()
  const group = data.allFile.group
  const sortBy = ['support', 'terms', 'release']
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
    <Layout pageContext={pageContext}>
      <Search />
      {data.mdx ? (
        <>
          <Seo title={data.mdx.frontmatter.title} />
          <div className={mainContent}>
            <div className={container}>
              <aside className={sidebar}>
                <div className={sidebarInner}>
                  <nav className={backNav}>
                    <button onClick={() => navigate(-1)} className={backButton}>
                      <ArrowIcon />
                      {intl.formatMessage({ id: 'support.back' })}
                    </button>
                  </nav>
                  <nav className={supportNav}>
                    <ul className={navList}>
                      {customSort({
                        data: group,
                        sortBy: sortBy,
                        sortField: 'fieldValue'
                      }).map(g => (
                        <NavItem item={g} key={g.fieldValue} />
                      ))}
                    </ul>
                  </nav>
                </div>
              </aside>
              <div className={content}>
                <article className={supportArticle}>
                  <h1 className={articleTitle}>{data.mdx.frontmatter.title}</h1>
                  <div className={separator}></div>
                  <div className={articleWrapper}>
                    <div className={articleContent}>
                      <MDXRenderer>{data.mdx.body}</MDXRenderer>
                      <div className={updateTime}>
                        <CheckMark />
                        <span>
                          {intl.formatMessage({ id: 'support.lastUpdated' })}
                          {data.mdx.fields.gitAuthorTime}
                        </span>
                      </div>
                    </div>
                    <div className={articleToc}>
                      {data.mdx.tableOfContents.items ? (
                        <>
                          <h3>
                            <ChevronIcon />
                            {intl.formatMessage({ id: 'support.toc' })}
                          </h3>
                          <ul>
                            {data.mdx.tableOfContents.items.map(item => (
                              <ListItem item={item} key={item.title} />
                            ))}
                          </ul>
                        </>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <Seo title={intl.formatMessage({ id: 'detail.notransTitle' })} />
          <div className={mainContent}>
            <div className={container}>
              <p className={notransText}>{intl.formatMessage({ id: 'detail.notrans' })}</p>
            </div>
          </div>
        </>
      )}
    </Layout>
  )
}

export default SupportTemplate

export const query = graphql`
  query ($locale: String!, $slug: String!) {
    allFile(
      filter: {
        sourceInstanceName: { eq: "support" }
        childMdx: { fields: { locale: { eq: $locale } } }
      }
      sort: { fields: childMdx___frontmatter___mdxID, order: ASC }
    ) {
      group(field: childrenMdx___frontmatter___type) {
        fieldValue
        nodes {
          childMdx {
            id
            frontmatter {
              title
              slug
            }
          }
        }
      }
    }
    mdx(fields: { locale: { eq: $locale } }, frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        slug
        title
      }
      fields {
        gitAuthorTime
      }
      body
      tableOfContents(maxDepth: 3)
    }
  }
`
