import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link, useTranslation } from 'gatsby-plugin-react-i18next'

import Layout from '../components/layout'
import Seo from '../components/seo'
import Search from '../components/_algolia'
import DetailSidebar from '../components/pack-sidebar'

import ArrowIcon from '../../static/assets/icons/arrowForward.inline.svg'

const PackDetail = ({ data, pageContext }) => {
  const { t } = useTranslation()
  const { next, previous } = pageContext
  return (
    <Layout pageContext={pageContext}>
      <div className="fixed top-header w-full bg-gray px-xl py-lg text-center border-b border-gray-1 z-30">
        <Search locale={pageContext.language} />
      </div>
      <div className="w-full m-[0_auto] flex-grow flex flex-col items-start">
        {data.logoPack ? (
          <>
            <div className="w-full flex-grow flex flex-row flex-nowrap tablet:flex-wrap border-b border-b-gray-1">
              <section className="w-full pt-[160px] flex-grow flex flex-col bg-white">
                <div className="w-full p-xl flex-grow grid items-center justify-items-center gap-xl grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] tablet:grid-cols-[repeat(auto-fill,_minmax(150px,_1fr))]">
                  {data.logoPack.itemsInfo.map(item => (
                    <Link
                      key={item.id}
                      to={item.slug}
                      className="hover:scale-105 transition-transform"
                    >
                      <GatsbyImage
                        image={getImage(item.pngPath)}
                        alt={item.detailInfo[0].info[0].fullName}
                        className="m-[10%]"
                      />
                    </Link>
                  ))}
                </div>
              </section>
              <DetailSidebar
                pngPath={data.logoPack.packInfo[0].pngPath}
                season={data.logoPack.season}
                name={data.logoPack.name}
                type={data.logoPack.packInfo[0].detailInfo[0].type}
                tableInfo={data.logoPack.packInfo[0].detailInfo[0].info[0]}
                websiteURL={data.logoPack.packInfo[0].detailInfo[0].websiteURL}
                weiboURL={data.logoPack.packInfo[0].detailInfo[0].weiboURL}
                twitterURL={data.logoPack.packInfo[0].detailInfo[0].twitterURL}
                wikiURL={data.logoPack.packInfo[0].detailInfo[0].wikiURL}
              />
            </div>
            <nav className="w-full flex flex-row items-center justify-between px-xl py-3xl">
              <div className="w-[50px] h-[50px] rounded">
                {previous ? (
                  <Link
                    to={previous.slug}
                    className="w-[50px] h-[50px] inline-flex items-center justify-center hover:bg-green hover:bg-opacity-20 rounded"
                  >
                    <ArrowIcon className="w-xl h-xl stroke-dark-gray rotate-180" />
                  </Link>
                ) : (
                  ''
                )}
              </div>
              <div className="w-[50px] h-[50px] rounded">
                {next ? (
                  <Link
                    to={next.slug}
                    className="w-[50px] h-[50px] inline-flex items-center justify-center hover:bg-green hover:bg-opacity-20 rounded"
                  >
                    <ArrowIcon className="w-xl h-xl stroke-dark-gray" />
                  </Link>
                ) : (
                  ''
                )}
              </div>
            </nav>
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

export default PackDetail

export const Head = ({ data }) => {
  const locales = data.locales.edges[0].node.data
  let obj = undefined
  if (locales) {
    obj = JSON.parse(locales)
  }
  return (
    <>
      {data.logoPack ? (
        <Seo title={`${data.logoPack.season} ${data.logoPack.name}${obj?.detailTitleVectorPack}`} />
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
    logoPack(fields: { locale: { eq: $language } }, slug: { eq: $slug }) {
      id
      slug
      season
      name
      packInfo {
        id
        pngPath {
          childImageSharp {
            gatsbyImageData(width: 150, placeholder: BLURRED, formats: WEBP, layout: CONSTRAINED)
          }
        }
        detailInfo {
          type
          info {
            fullName
            shortName
            localName
            founded
            headquarter
            assn
            conf
            affiliations
            confederation
            teams
            level
            promotion
            relegation
          }
          websiteURL
          weiboURL
          twitterURL
          wikiURL
        }
      }
      itemsInfo {
        id
        slug
        detailInfo {
          info {
            fullName
          }
        }
        pngPath {
          childImageSharp {
            gatsbyImageData(width: 200, placeholder: BLURRED, formats: WEBP, layout: CONSTRAINED)
          }
        }
      }
    }
  }
`
