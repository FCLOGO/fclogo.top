import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { LocalizedLink } from 'gatsby-plugin-usei18n'
import { useIntl } from 'react-intl'

import Layout from '../components/layout'
import Seo from '../components/seo'
import Search from '../components/singleSearch'
import DetailSidebar from '../components/detailSidebar'

import {
  mainContent,
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
} from './logoDetail.module.styl'

import HistoryTimline from '../components/historyTimeline'
import ArrowIcon from '../../static/assets/icons/arrowForward.inline.svg'

const LogoDeatil = ({ data, pageContext }) => {
  const intl = useIntl()
  const { next, previous } = pageContext
  return (
    <Layout pageContext={pageContext}>
      <Search />
      {data.logo ? (
        <>
          <Seo title={data.logo.detailInfo[0].info[0].fullName[1]} />
          <div className={mainContent}>
            <section className={detailWrapper}>
              <section className={logoHolder}>
                <div className={holderInner}>
                  <div className={imageHolder}>
                    <GatsbyImage
                      image={getImage(data.logo.pngPath)}
                      alt={data.logo.detailInfo[0].info[0].fullName[1]}
                      className={logoImage}
                    />
                  </div>
                  {data.logo.styleMode.length > 0 ? (
                    <div className={logoStyles}>
                      <ul className={styleList}>
                        <li className={`${styleItem} ${current}`}>
                          <GatsbyImage
                            image={getImage(data.logo.pngPath)}
                            alt={data.logo.detailInfo[0].info[0].fullName[1]}
                            className={styleImage}
                          />
                        </li>
                        {data.logo.styleMode.map(item => (
                          <li key={item.id} className={styleItem}>
                            <LocalizedLink className={styleLink} to={item.slug}>
                              <GatsbyImage
                                image={getImage(item.pngPath)}
                                alt={item.detailInfo[0].info[0].fullName[1]}
                                className={styleImage}
                              />
                            </LocalizedLink>
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
                fullName={data.logo.detailInfo[0].info[0].fullName[1]}
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
            {data.logo.logoHistory.length ? <HistoryTimline logos={data.logo.logoHistory} /> : ''}
            <section className={detailNav}>
              <div className={linkWrapper}>
                {previous ? (
                  <LocalizedLink className={previousLink} to={previous.slug}>
                    <ArrowIcon className={arrowIcon} />
                  </LocalizedLink>
                ) : (
                  ''
                )}
              </div>
              <div className={linkWrapper}>
                {next ? (
                  <LocalizedLink className={nextLink} to={next.slug}>
                    <ArrowIcon className={arrowIcon} />
                  </LocalizedLink>
                ) : (
                  ''
                )}
              </div>
            </section>
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
    </Layout>
  )
}

export default LogoDeatil

export const query = graphql`
  query ($locale: String!, $slug: String!) {
    logo(fields: { locale: { eq: $locale } }, slug: { eq: $slug }) {
      id
      version
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
        info {
          fullName
          localName
          city
          founded
          ground
          league
        }
        websiteURL
        weiboURL
        twitterURL
        wikiURL
      }
      logoHistory {
        id
        version
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