import React, { useState, useEffect, useRef } from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import AdSense from 'react-adsense'
import { useIntl } from 'react-intl'
import { LocalizedLink } from 'gatsby-plugin-usei18n'

import Layout from '../components/layout'
import Seo from '../components/seo'
import Search from '../components/single-search'

import {
  mainContent,
  logosWrapper,
  adsenseContainer,
  packsContainer,
  cardLink,
  itemImageWrapper,
  itemImage,
  cardFooter,
  footerText,
  packName,
  seasonBadge,
  loadRefContainer,
  nothingContainer,
  nothingText
} from './packs.module.styl'

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

const AllPacks = ({ data, pageContext }) => {
  const intl = useIntl()
  // Array of all news logos
  const allPacks = data.allLogoPack.nodes

  // State for the list
  const [list, setList] = useState([...allPacks.slice(0, 20)])

  // State to trigger oad more
  const [loadMore, setLoadMore] = useState(false)

  // State of whether there is more to load
  const [hasMore, setHasMore] = useState(allPacks.length > 20)

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
      const isMore = currentLength < allPacks.length
      const nextResults = isMore ? allPacks.slice(currentLength, currentLength + 20) : []
      setList([...list, ...nextResults])
      setLoadMore(false)
    }
  }, [loadMore, hasMore]) //eslint-disable-line

  //Check if there is more
  useEffect(() => {
    const isMore = list.length < allPacks.length
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
          {allPacks.length ? (
            <>
              <div className={packsContainer}>
                {list.map(pack => (
                  <article key={pack.id}>
                    <LocalizedLink className={cardLink} to={pack.slug}>
                      <div className={itemImageWrapper}>
                        {pack.itemsInfo.slice(0, 9).map(info => (
                          <GatsbyImage
                            key={info.sourceID}
                            image={getImage(info.pngPath)}
                            alt=""
                            className={itemImage}
                          />
                        ))}
                      </div>
                      <footer className={cardFooter}>
                        <div className={footerText}>
                          <span className={seasonBadge}>
                            {intl.formatMessage({ id: pack.season })}
                          </span>
                          <h3 className={packName}>{pack.name}</h3>
                        </div>
                        <GatsbyImage
                          key={pack.id}
                          image={getImage(pack.packInfo[0].pngPath)}
                          alt=""
                        />
                      </footer>
                    </LocalizedLink>
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

export default AllPacks

export const query = graphql`
  query ($locale: String!) {
    allLogoPack(filter: { fields: { locale: { eq: $locale } } }) {
      nodes {
        id
        name
        season
        slug
        packInfo {
          pngPath {
            childImageSharp {
              gatsbyImageData(width: 50, placeholder: BLURRED, formats: WEBP, layout: CONSTRAINED)
            }
          }
        }
        itemsInfo {
          sourceID
          pngPath {
            childImageSharp {
              gatsbyImageData(width: 200, placeholder: BLURRED, formats: WEBP, layout: CONSTRAINED)
            }
          }
        }
      }
    }
  }
`
