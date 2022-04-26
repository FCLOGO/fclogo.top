import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { LocalizedLink } from 'gatsby-plugin-usei18n'
import { useIntl } from 'react-intl'

// import Layout from '../components/layout'
import ConditionalLayout from '../components/conditional-layout'
import ModalLink from '../components/modal-link'
import Seo from '../components/seo'
// import Search from '../components/single-search'
import DetailSidebar from '../components/detail-sidebar'

import {
  mainContent,
  contentInner,
  detailWrapper,
  logoHolder,
  holderInner,
  imageHolder,
  logoImage,
  logoStyles,
  styleList,
  styleItem,
  current,
  styleImage,
  styleLink,
  detailNav,
  linkWrapper,
  previousLink,
  nextLink,
  arrowIcon,
  notransWrapper,
  notransText
} from './logo-detail.module.styl'

import HistoryTimline from '../components/history-timeline'
import ArrowIcon from '../../static/assets/icons/arrowForward.inline.svg'

const LogoDeatil = ({ data, pageContext }) => {
  const intl = useIntl()
  const { next, previous } = pageContext
  return (
    <ConditionalLayout pageContext={pageContext}>
      {/* <Search locale={pageContext.locale} /> */}
      {data.logo ? (
        <>
          <Seo
            title={`${data.logo.detailInfo[0].info[0].fullName}${intl.formatMessage({
              id: 'detail.titleVector'
            })}`}
          />
          <div className={mainContent}>
            <div className={contentInner}>
              <section className={detailWrapper}>
                <section className={logoHolder}>
                  <div className={holderInner}>
                    <div className={imageHolder}>
                      <GatsbyImage
                        image={getImage(data.logo.pngPath)}
                        alt={data.logo.detailInfo[0].info[0].fullName}
                        className={logoImage}
                      />
                    </div>
                    {data.logo.styleMode.length > 0 ? (
                      <div className={logoStyles}>
                        <ul className={styleList}>
                          <li className={`${styleItem} ${current}`}>
                            <GatsbyImage
                              image={getImage(data.logo.pngPath)}
                              alt={data.logo.detailInfo[0].info[0].fullName}
                              className={styleImage}
                            />
                          </li>
                          {data.logo.styleMode.map(item => (
                            <li key={item.id} className={styleItem}>
                              <ModalLink
                                className={styleLink}
                                to={item.slug}
                                state={{
                                  modal: true,
                                  noScroll: true
                                }}
                              >
                                <GatsbyImage
                                  image={getImage(item.pngPath)}
                                  alt={item.detailInfo[0].info[0].fullName}
                                  className={styleImage}
                                />
                              </ModalLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </section>
                <DetailSidebar
                  version={data.logo.version}
                  isOutdated={data.logo.isOutdated}
                  isDoubtful={data.logo.isDoubtful}
                  slug={data.logo.slug}
                  status={data.logo.detailInfo[0].isDisband}
                  fullName={data.logo.detailInfo[0].info[0].fullName}
                  pngURL={data.logo.pngPath.publicURL}
                  svgURL={data.logo.svgPath.publicURL}
                  type={data.logo.detailInfo[0].type}
                  tableInfo={data.logo.detailInfo[0].info[0]}
                  websiteURL={data.logo.detailInfo[0].websiteURL}
                  weiboURL={data.logo.detailInfo[0].weiboURL}
                  twitterURL={data.logo.detailInfo[0].twitterURL}
                  wikiURL={data.logo.detailInfo[0].wikiURL}
                />
              </section>
              {data.logo.logoHistory.length > 1 ? (
                <HistoryTimline logos={data.logo.logoHistory} />
              ) : (
                ''
              )}
              <section className={detailNav}>
                <div className={linkWrapper}>
                  {previous ? (
                    <ModalLink
                      className={previousLink}
                      to={previous.slug}
                      state={{
                        modal: true,
                        noScroll: true
                      }}
                    >
                      <ArrowIcon className={arrowIcon} />
                    </ModalLink>
                  ) : (
                    ''
                  )}
                </div>
                <div className={linkWrapper}>
                  {next ? (
                    <ModalLink
                      className={nextLink}
                      to={next.slug}
                      state={{
                        modal: true,
                        noScroll: true
                      }}
                    >
                      <ArrowIcon className={arrowIcon} />
                    </ModalLink>
                  ) : (
                    ''
                  )}
                </div>
              </section>
            </div>
          </div>
        </>
      ) : (
        <>
          <Seo title={intl.formatMessage({ id: 'detail.notransTitle' })} />
          <div className={mainContent}>
            <section className={notransWrapper}>
              <p className={notransText}>{intl.formatMessage({ id: 'detail.notrans' })}</p>
            </section>
          </div>
        </>
      )}
    </ConditionalLayout>
  )
}

export default LogoDeatil

export const query = graphql`
  query ($locale: String!, $slug: String!) {
    logo(fields: { locale: { eq: $locale } }, slug: { eq: $slug }) {
      id
      slug
      version
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
      styleMode {
        id
        slug
        pngPath {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, width: 50, layout: FIXED, formats: WEBP)
          }
        }
        detailInfo {
          info {
            fullName
          }
        }
      }
      detailInfo {
        type
        isDisband
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
      logoHistory {
        id
        version
        isDoubtful
        slug
        pngPath {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, width: 100, layout: FIXED, formats: WEBP)
          }
        }
      }
    }
  }
`
