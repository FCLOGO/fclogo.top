import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { StaticImage, GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import AdSense from 'react-adsense'

import ConditionalLayout from '../components/conditional-layout'
import ModalLink from '../helpers/modal-link'
import Seo from '../components/seo'
import Sidebar from '../components/detail-sidebar'
import LogoTimeline from '../components/logo-timeline'

import ArrowIcon from '../../static/assets/icons/arrowForward.inline.svg'
import InfoIcon from '../../static/assets/icons/info.inline.svg'
import CloseIcon from '../../static/assets/icons/close.inline.svg'
import DoneIcon from '../../static/assets/icons/checkmark.inline.svg'

// Google Adsense
const DetailAdsense = () => {
  return (
    <AdSense.Google
      style={{ display: 'block' }}
      format="autorelaxed"
      responsive="true"
      client="ca-pub-9573165480183467"
      slot="7735919201"
    />
  )
}

const LogoDetail = ({ data, pageContext }) => {
  const { t } = useTranslation()
  const [showAd, setShowAd] = useState(false) // 控制广告显示
  const handleShowAd = () => {
    setShowAd(true)
  }
  const handleCloseAd = () => {
    setShowAd(false) // 关闭广告
  }
  const { next, previous } = pageContext
  return (
    <ConditionalLayout pageContext={pageContext}>
      {/* <div className="fixed top-header w-full bg-gray px-xl py-lg text-center border-b border-gray-1 z-30">
        <Search locale={pageContext.language} />
      </div> */}
      <div className="w-full m-[0_auto] flex-grow main-content block">
        {data.logo ? (
          <div className="content-inner flex flex-col items-start">
            <div className="w-full flex-grow flex flex-row flex-nowrap tablet:flex-wrap detail-wrapper overflow-hidden">
              <section className="w-full pt-[152px] flex-grow flex flex-col overflow-hidden relative">
                {data.logo.reference && (
                  <div className="absolute left-xl top-auto group flex flex-row items-center p-sm bg-white rounded-md shadow max-w-[400px]">
                    <InfoIcon className="w-xl h-xl flex-shrink-0 cursor-pointer" />
                    <span className="text-xs whitespace-nowrap overflow-hidden text-ellipsis ml-sm hidden group-hover:inline-block">
                      {t('detail.reference')}
                      <a
                        rel="noopener noreferrer"
                        target="_blank"
                        href={data.logo.reference}
                        className="text-link"
                      >
                        {data.logo.reference}
                      </a>
                    </span>
                  </div>
                )}
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
                {showAd && (
                  <div className="ad-overlay text-white absolute top-zero bottom-zero right-zero left-zero bg-dark-gray bg-opacity-75 w-full h-full p-xl pt-[170px] flex flex-col justify-between">
                    <div className="flex flex-row-reverse">
                      <CloseIcon
                        className="w-3xl h-3xl flex-shrink-0 cursor-pointer"
                        onClick={handleCloseAd}
                      />
                    </div>
                    <div className="flex-grow flex flex-col justify-center items-center">
                      <DoneIcon className="text-light-green w-[120px] h-[120px] mb-md" />
                      <span className="uppercase font-medium">{t('downloadtips')}</span>
                    </div>
                    <div className="flex-grow text-center">
                      <DetailAdsense />
                    </div>
                  </div>
                )}
              </section>
              <Sidebar
                version={data.logo.version}
                isOutdated={data.logo.isOutdated}
                isDoubtful={data.logo.isDoubtful}
                fullName={data.logo.detailInfo[0].info[0].fullName}
                slug={data.logo.slug}
                logoID={data.logo.logoID}
                sourceID={data.logo.sourceID}
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
                ctrbInfo={data.logo.contributorInfo[0]}
                detailInfo={data.logo.detailInfo[0]}
                onDownload={handleShowAd}
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

export default LogoDetail

export const Head = ({ data, pageContext }) => {
  const locales = data.locales.edges[0].node.data
  const { i18n, language } = pageContext
  let obj = undefined
  if (locales) {
    obj = JSON.parse(locales)
  }
  return (
    <>
      {data.logo ? (
        <Seo
          title={`${data.logo.detailInfo[0].info[0].fullName}${obj?.detailTitleVector}`}
          path={i18n.path}
          description={`${obj?.headDownload}${data.logo.detailInfo[0].info[0].fullName}${obj?.detailTitleVector}${obj?.detailDescription}`}
          image={`${data.logo.pngPath.publicURL}`}
          type="article"
          locale={language}
          languages={i18n.languages}
          originalPath={i18n.originalPath}
        />
      ) : (
        <Seo title={obj?.detailNotransTitle} description={obj?.indexDescription} />
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
      logoID
      sourceID
      slug
      version
      verName
      isDoubtful
      isOutdated
      pngPath {
        publicURL
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, width: 400, layout: FIXED, formats: WEBP)
        }
      }
      svgPath {
        publicURL
      }
      reference
      ctrbID
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
          hostCountry
          dates
        }
        websiteURL
        weiboURL
        twitterURL
        wikiURL
        nation
        nationalFlag {
          flag2 {
            childImageSharp {
              gatsbyImageData(width: 28, placeholder: BLURRED, formats: WEBP, layout: CONSTRAINED)
            }
          }
        }
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
      contributorInfo {
        name
        link
      }
    }
  }
`
