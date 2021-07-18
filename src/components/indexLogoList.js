import React from 'react'
import { useIntl } from 'react-intl'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { LocalizedLink } from 'gatsby-plugin-usei18n'

import ArrowIcon from '../../static/assets/icons/arrowForward.inline.svg'

import {
  cardsWrapper,
  cardsHeader,
  cardsTitle,
  moreLink,
  arrowIcon,
  cardsContainer,
  logoCard,
  cardInner,
  cardLink,
  logoImage,
  cardFooter,
  logoName,
  formatList,
  formatItem,
  nothingText
} from './indexLogoList.module.styl'

const LogoList = ({ data }) => {
  const intl = useIntl()
  return (
    <section className={cardsWrapper}>
      <div className={cardsHeader}>
        <h2 className={cardsTitle}>{intl.formatMessage({ id: `index.cardTitle` })}</h2>
        <LocalizedLink className={moreLink} to="/">
          {intl.formatMessage({ id: `index.viewMore` })}
          <ArrowIcon className={arrowIcon} />
        </LocalizedLink>
      </div>
      <div className={cardsContainer}>
        {data.allLogo.nodes.length ? (
          data.allLogo.nodes.map(node => (
            <article key={node.uniqueID} className={logoCard}>
              <div className={cardInner}>
                <LocalizedLink className={cardLink} to="/">
                  <GatsbyImage
                    image={getImage(node.logoPath)}
                    alt={node.fullName}
                    className={logoImage}
                  />
                  <footer className={cardFooter}>
                    <h3 className={logoName}>{node.shortName}</h3>
                    <ul className={formatList}>
                      {node.fileFormat.map(item => (
                        <li key={item} className={formatItem}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </footer>
                </LocalizedLink>
              </div>
            </article>
          ))
        ) : (
          <article className={logoCard}>
            <h2 className={nothingText}>{intl.formatMessage({ id: `index.noLogo` })}</h2>
          </article>
        )}
      </div>
    </section>
  )
}

export default LogoList
