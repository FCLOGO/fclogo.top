import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useIntl } from 'react-intl'
import { LocalizedLink } from 'gatsby-plugin-usei18n'

import Layout from '../components/layout'
import ModalLink from '../components/modal-link'
import Seo from '../components/seo'
import Search from '../components/single-search'
import DetailSidebar from '../components/pack-detail-sidebar'

import ArrowIcon from '../../static/assets/icons/arrowForward.inline.svg'

import {
  mainContent,
  contentInner,
  detailWrapper,
  packHolder,
  holderInner,
  imageHolder,
  itemLink,
  itemImage,
  detailNav,
  linkWrapper,
  previousLink,
  nextLink,
  arrowIcon,
  notransWrapper,
  notransText
} from './pack-detail.module.styl'

const PackDetail = ({ data, pageContext }) => {
  const intl = useIntl()
  const { next, previous } = pageContext
  return (
    <Layout pageContext={pageContext}>
      <Search locale={pageContext.locale} />
      {data.logoPack ? (
        <>
          <Seo
            title={`${data.logoPack.season} ${data.logoPack.name}${intl.formatMessage({
              id: 'detail.titleVectorPack'
            })}`}
          />
          <div className={mainContent}>
            <div className={contentInner}>
              <section className={detailWrapper}>
                <section className={packHolder}>
                  <div className={holderInner}>
                    <div className={imageHolder}>
                      {data.logoPack.itemsInfo.map(item => (
                        <ModalLink
                          className={itemLink}
                          key={item.id}
                          to={item.slug}
                          state={{
                            modal: true,
                            noScroll: true
                          }}
                        >
                          <GatsbyImage
                            image={getImage(item.pngPath)}
                            alt={item.detailInfo[0].info[0].shortName}
                            className={itemImage}
                          />
                        </ModalLink>
                      ))}
                    </div>
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
              </section>
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

export default PackDetail

export const query = graphql`
  query ($locale: String!, $slug: String!) {
    logoPack(fields: { locale: { eq: $locale } }, slug: { eq: $slug }) {
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
            shortName
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
