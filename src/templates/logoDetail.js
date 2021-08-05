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
  historyWrapper
} from './logoDetail.module.styl'

const LogoDeatil = ({ data, pageContext }) => {
  const intl = useIntl()
  const info = data.logo.detailInfo[0].info[0]
  return (
    <Layout pageContext={pageContext}>
      <Search />
      {data.logo ? (
        <>
          <Seo title={info.fullName[1]} />
          <div className={mainContent}>
            <section className={detailWrapper}>
              <section className={logoHolder}>
                <div className={holderInner}>
                  <div className={imageHolder}>
                    <GatsbyImage
                      image={getImage(data.logo.pngPath)}
                      alt={info.fullName[1]}
                      className={logoImage}
                    />
                  </div>
                  {data.logo.styleMode.length > 0 ? (
                    <div className={logoStyles}>
                      <ul className={styleList}>
                        <li className={`${styleItem} ${current}`}>
                          <GatsbyImage
                            image={getImage(data.logo.pngPath)}
                            alt={info.fullName[1]}
                            className={styleImage}
                          />
                        </li>
                        {data.logo.styleMode.map(item => (
                          <li key={item.id} className={styleItem}>
                            <LocalizedLink className={styleLink} to={item.slug}>
                              <GatsbyImage
                                image={getImage(item.pngPath)}
                                alt={item.fullName}
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
                fullName={info.fullName[1]}
                pngURL={data.logo.pngPath.publicURL}
                svgURL={data.logo.svgPath.publicURL}
                type={data.logo.type}
                tableInfo={info}
                websiteURL={data.logo.detailInfo[0].websiteURL}
                weiboURL={data.logo.detailInfo[0].weiboURL}
                twitterURL={data.logo.detailInfo[0].twitterURL}
              />
            </section>
            <section className={historyWrapper}>
              <h3>{intl.formatMessage({ id: 'detail.historyTitle' })}</h3>
            </section>
          </div>
        </>
      ) : (
        <>
          <Seo title={intl.formatMessage({ id: 'detail.notransTitle' })} />
          <div className={mainContent}>
            <h2>{intl.formatMessage({ id: 'detail.notrans' })}</h2>
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
      fullName
      shortName
      localName
      type
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
        fullName
        slug
        pngPath {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, width: 50, layout: FIXED, formats: WEBP)
          }
        }
      }
      detailInfo {
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
      }
    }
  }
`
