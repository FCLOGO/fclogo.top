import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link, useTranslation } from 'gatsby-plugin-react-i18next'

import ConditionalLayout from '../components/conditional-layout'
import ModalLink from '../helpers/modal-link'
import Seo from '../components/seo'
import Sidebar from '../components/detail-sidebar'
import LogoTimeline from '../components/logo-timeline'

import ArrowIcon from '../../static/assets/icons/arrowForward.inline.svg'

const LogoDetail = ({ data, pageContext }) => {
  const { t } = useTranslation()
  const { next, previous } = pageContext
  return (
    <ConditionalLayout pageContext={pageContext}>
      {/* <div className="fixed top-header w-full bg-gray px-xl py-lg text-center border-b border-gray-1 z-30">
        <Search locale={pageContext.language} />
      </div> */}
      <div className="w-full m-[0_auto] flex-grow flex flex-col items-start main-content">
        {data.logo ? (
          <>
            <div className="w-full flex-grow flex flex-row flex-nowrap tablet:flex-wrap border-b border-b-gray-1 detail-wrapper">
              <section className="w-full pt-[160px] flex-grow flex flex-col bg-white">
                <div className="w-full flex-grow flex items-center justify-center">
                  <GatsbyImage
                    image={getImage(data.logo.pngPath)}
                    alt={data.logo.detailInfo[0].info[0].fullName}
                  />
                </div>
                {data.logo.otherStyle.length > 0 ? (
                  <div className="w-full h-[80px] my-3xl">
                    <ul className="flex flex-row items-start justify-center">
                      <li className="w-[80px] h-[80px] mr-md rounded border border-gray-2 cursor-pointer border-b-2 border-b-green bg-dark-gray bg-opacity-5">
                        <GatsbyImage
                          image={getImage(data.logo.pngPath)}
                          alt={data.logo.detailInfo[0].info[0].fullName}
                          className="h-[48px_!important] w-[48px_!important] m-lg"
                        />
                      </li>
                      {data.logo.otherStyle.map(item => (
                        <li
                          key={item.id}
                          className="w-[80px] h-[80px] mr-md rounded border border-gray-2 last:mr-zero hover:bg-dark-gray hover:bg-opacity-5"
                        >
                          <ModalLink
                            to={item.slug}
                            className="w-full h-full inline-block"
                            state={{
                              modal: true,
                              noScroll: true
                            }}
                          >
                            <GatsbyImage
                              image={getImage(item.pngPath)}
                              alt={item.detailInfo[0].info[0].fullName}
                              className="h-[48px_!important] w-[48px_!important] m-lg"
                            />
                          </ModalLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  ''
                )}
              </section>
              <Sidebar
                version={data.logo.version}
                isOutdated={data.logo.isOutdated}
                isDoubtful={data.logo.isDoubtful}
                fullName={data.logo.detailInfo[0].info[0].fullName}
                slug={data.logo.slug}
                status={data.logo.detailInfo[0].status}
                pngURL={data.logo.pngPath.publicURL}
                svgURL={data.logo.svgPath.publicURL}
                type={data.logo.detailInfo[0].type}
                tableInfo={data.logo.detailInfo[0].info[0]}
                websiteURL={data.logo.detailInfo[0].websiteURL}
                weiboURL={data.logo.detailInfo[0].weiboURL}
                twitterURL={data.logo.detailInfo[0].twitterURL}
                wikiURL={data.logo.detailInfo[0].wikiURL}
                verName={data.logo.verName}
              />
            </div>
            {data.logo.logoTimeline.length > 1 ? (
              <LogoTimeline logos={data.logo.logoTimeline} />
            ) : (
              ''
            )}
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
                    className="nav-link  w-[50px] h-[50px] inline-flex items-center justify-center hover:bg-green hover:bg-opacity-20 rounded"
                  >
                    <ArrowIcon className="w-xl h-xl stroke-dark-gray" />
                  </ModalLink>
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
    </ConditionalLayout>
  )
}

export default LogoDetail

export const Head = ({ data }) => {
  const locales = data.locales.edges[0].node.data
  let obj = undefined
  if (locales) {
    obj = JSON.parse(locales)
  }
  return (
    <>
      {data.logo ? (
        <Seo title={`${data.logo.detailInfo[0].info[0].fullName}${obj?.detailTitleVector}`} />
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
    logo(fields: { locale: { eq: $language } }, slug: { eq: $slug }) {
      id
      slug
      version
      verName
      isDoubtful
      isOutdated
      pngPath {
        publicURL
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, width: 300, layout: FIXED, formats: WEBP)
        }
      }
      svgPath {
        publicURL
      }
      detailInfo {
        type
        status
        info {
          fullName
          shortName
          localName
          city
          founded
          duration
          ground
          league
          headquarter
          assn
          conf
          affiliations
          confederation
          teams
          level
          promotion
          relegation
          code
          membership
        }
        websiteURL
        weiboURL
        twitterURL
        wikiURL
      }
      otherStyle {
        id
        slug
        detailInfo {
          info {
            fullName
          }
        }
        pngPath {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, width: 50, layout: FIXED, formats: WEBP)
          }
        }
      }
      logoTimeline {
        id
        slug
        version
        isDoubtful
        pngPath {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, width: 100, layout: FIXED, formats: WEBP)
          }
        }
      }
    }
  }
`
