import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useTranslation } from 'gatsby-plugin-react-i18next'

import ConditionalLayout from '../components/conditional-layout'
import ModalLink from '../helpers/modal-link'
import Seo from '../components/seo'
import DetailSidebar from '../components/pack-sidebar'

import ArrowIcon from '../../static/assets/icons/arrowForward.inline.svg'

const PackDetail = ({ data, pageContext }) => {
  const { t } = useTranslation()
  const { next, previous } = pageContext
  return (
    <ConditionalLayout pageContext={pageContext}>
      <div className="w-full m-[0_auto] flex-grow main-content block">
        {data.logoPack ? (
          <div className="content-inner flex flex-col items-start">
            <div className="w-full flex-grow flex flex-row flex-nowrap tablet:flex-wrap border-b border-b-gray-1 detail-wrapper">
              <section className="w-full pt-[160px] flex-grow flex flex-col overflow-hidden">
                <div className="w-full p-xl flex-grow grid items-start justify-items-center gap-xl grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] tablet:grid-cols-[repeat(auto-fill,_minmax(160px,_1fr))]">
                  {data.logoPack.itemsInfo.map(item => (
                    <ModalLink
                      key={item.id}
                      to={item.slug}
                      state={{
                        modal: true,
                        noScroll: true
                      }}
                      className="hover:scale-105 transition-transform"
                    >
                      <GatsbyImage
                        image={getImage(item.pngPath)}
                        alt={item.detailInfo[0].info[0].fullName}
                        className="m-[6%]"
                      />
                    </ModalLink>
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
            <nav className="w-full flex flex-row items-center justify-between px-xl py-3xl detail-nav">
              <div className="w-[50px] h-[50px] rounded">
                {previous ? (
                  <ModalLink
                    to={previous.slug}
                    state={{
                      modal: true,
                      noScroll: true
                    }}
                    className="nav-link w-[50px] h-[50px] inline-flex items-center justify-center hover:bg-green hover:bg-opacity-20 rounded"
                  >
                    <ArrowIcon className="w-xl h-xl stroke-dark-gray rotate-180" />
                  </ModalLink>
                ) : (
                  ''
                )}
              </div>
              <div className="w-[50px] h-[50px] rounded">
                {next ? (
                  <ModalLink
                    to={next.slug}
                    state={{
                      modal: true,
                      noScroll: true
                    }}
                    className="nav-link w-[50px] h-[50px] inline-flex items-center justify-center hover:bg-green hover:bg-opacity-20 rounded"
                  >
                    <ArrowIcon className="w-xl h-xl stroke-dark-gray" />
                  </ModalLink>
                ) : (
                  ''
                )}
              </div>
            </nav>
          </div>
        ) : (
          <section className="w-full p-xl text-center pt-[160px] mt-[100px]">
            <p className="font-semibold text-light-gray">{t('detail.notrans')}</p>
          </section>
        )}
      </div>
    </ConditionalLayout>
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
            gatsbyImageData(width: 200, placeholder: BLURRED, formats: WEBP, layout: CONSTRAINED)
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
