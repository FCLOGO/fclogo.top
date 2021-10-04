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
  cardLink,
  logoImage,
  cardFooter,
  logoName,
  formatList,
  formatItem,
  nothingContainer,
  nothingText
} from './index-logo-list.module.styl'

const LogoList = ({ data }) => {
  const intl = useIntl()
  return (
    <section className={cardsWrapper}>
      <div className={cardsHeader}>
        <h2 className={cardsTitle}>{intl.formatMessage({ id: `index.cardTitle` })}</h2>
        <LocalizedLink className={moreLink} to="/logos">
          {intl.formatMessage({ id: `index.viewMore` })}
          <ArrowIcon className={arrowIcon} />
        </LocalizedLink>
      </div>

      {data.allLogo.nodes.length ? (
        <div className={cardsContainer}>
          {data.allLogo.nodes.slice(0, 12).map(node => (
            <article key={node.id}>
              <LocalizedLink className={cardLink} to={node.slug}>
                <GatsbyImage
                  image={getImage(node.pngPath)}
                  alt={node.detailInfo[0].info[0].fullName[1]}
                  className={logoImage}
                />
                <footer className={cardFooter}>
                  <h3 className={logoName}>{node.detailInfo[0].info[0].shortName[1]}</h3>
                  <ul className={formatList}>
                    {node.fileFormat.map(item => (
                      <li key={item} className={formatItem}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </footer>
              </LocalizedLink>
            </article>
          ))}
        </div>
      ) : (
        <div className={nothingContainer}>
          <h2 className={nothingText}>{intl.formatMessage({ id: `index.noLogo` })}</h2>
        </div>
      )}
    </section>
  )
}

export default LogoList
