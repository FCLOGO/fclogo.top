import React from 'react'
import { useIntl } from 'react-intl'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { LocalizedLink } from 'gatsby-plugin-usei18n'
import ModalLink from './modal-link'

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
  styleBadge,
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
              <ModalLink
                className={cardLink}
                to={node.slug}
                state={{
                  modal: true,
                  noScroll: true
                }}
              >
                <GatsbyImage
                  image={getImage(node.pngPath)}
                  alt={node.detailInfo[0].info[0].fullName}
                  className={logoImage}
                />
                <footer className={cardFooter}>
                  <h3 className={logoName}>{node.detailInfo[0].info[0].shortName}</h3>
                  <span className={styleBadge}>{intl.formatMessage({ id: node.style })}</span>
                </footer>
              </ModalLink>
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
