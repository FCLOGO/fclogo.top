import React, { useState, useEffect, useRef } from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import AdSense from 'react-adsense'
import { LocalizedLink } from 'gatsby-plugin-usei18n'
import { useIntl } from 'react-intl'

import Layout from '../components/layout'
import Seo from '../components/seo'
import Search from '../components/single-search'
import ModalLink from '../components/modal-link'

import {
  mainContent,
  logosWrapper,
  adsenseContainer,
  logosContainer,
  cardLink,
  logoImage,
  cardFooter,
  logoName,
  versionBadge,
  styleBadge,
  loadRefContainer,
  nothingContainer,
  nothingText
} from './logos.module.styl'

const PageAdsense = () => {
  return (
    <AdSense.Google
      client="ca-pub-9573165480183467"
      slot="6472280758"
      style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'center' }}
      format="fluid"
      layoutKey="-e9+5m+dl-gv-b2"
    />
  )
}

const AllLogo = ({ data, pageContext }) => {
  const intl = useIntl()
  // Array of all news logos
  const allLogos = data.allLogo.nodes

  // State for the list
  const [list, setList] = useState([...allLogos.slice(0, 20)])

  // State to trigger oad more
  const [loadMore, setLoadMore] = useState(false)

  // State of whether there is more to load
  const [hasMore, setHasMore] = useState(allLogos.length > 20)

  //Set a ref for the loading div
  const loadRef = useRef()

  // Handle intersection with load more div
  const handleObserver = entities => {
    const target = entities[0]
    if (target.isIntersecting) {
      setLoadMore(true)
    }
  }

  //Initialize the intersection observer API
  useEffect(() => {
    var options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0
    }
    const observer = new IntersectionObserver(handleObserver, options)
    if (loadRef.current) {
      observer.observe(loadRef.current)
    }
  }, [])

  // Handle loading more articles
  useEffect(() => {
    if (loadMore && hasMore) {
      const currentLength = list.length
      const isMore = currentLength < allLogos.length
      const nextResults = isMore ? allLogos.slice(currentLength, currentLength + 20) : []
      setList([...list, ...nextResults])
      setLoadMore(false)
    }
  }, [loadMore, hasMore]) //eslint-disable-line

  //Check if there is more
  useEffect(() => {
    const isMore = list.length < allLogos.length
    setHasMore(isMore)
  }, [list]) //eslint-disable-line

  return (
    <Layout pageContext={pageContext}>
      <Seo title={intl.formatMessage({ id: 'home.title' })} />
      <Search locale={pageContext.locale} />
      <div className={mainContent}>
        <section className={logosWrapper}>
          <div className={adsenseContainer}>
            <PageAdsense />
          </div>
          {allLogos.length ? (
            <>
              <div className={logosContainer}>
                {list.map(logo => (
                  <article key={logo.id}>
                    <ModalLink
                      className={cardLink}
                      to={logo.slug}
                      state={{
                        modal: true,
                        noScroll: true
                      }}
                    >
                      <GatsbyImage
                        image={getImage(logo.pngPath)}
                        alt={logo.detailInfo[0].info[0].fullName}
                        className={logoImage}
                      />
                      <footer className={cardFooter}>
                        <h3 className={logoName}>{logo.detailInfo[0].info[0].shortName}</h3>
                        <span className={versionBadge}>{logo.version}</span>
                        <span className={styleBadge}>{intl.formatMessage({ id: logo.style })}</span>
                      </footer>
                    </ModalLink>
                  </article>
                ))}
              </div>
              <div ref={loadRef} className={loadRefContainer}>
                <span></span>
                {hasMore ? (
                  <span>{intl.formatMessage({ id: `index.loading` })}</span>
                ) : (
                  <span>{intl.formatMessage({ id: `index.noMore` })}</span>
                )}
                <span></span>
              </div>
            </>
          ) : (
            <div className={nothingContainer}>
              <h2 className={nothingText}>{intl.formatMessage({ id: `index.noLogo` })}</h2>
            </div>
          )}
        </section>
      </div>
    </Layout>
  )
}

export default AllLogo

export const query = graphql`
  query ($locale: String!) {
    allLogo(
      sort: { order: DESC, fields: uniqueID }
      filter: { fields: { locale: { eq: $locale } } }
    ) {
      nodes {
        id
        version
        style
        pngPath {
          childImageSharp {
            gatsbyImageData(width: 300, placeholder: BLURRED, formats: WEBP, layout: CONSTRAINED)
          }
        }
        slug
        detailInfo {
          info {
            fullName
            shortName
          }
        }
      }
    }
  }
`
