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
  itemImageWrapper,
  itemImage,
  cardFooter,
  footerText,
  seasonBadge,
  packName
} from './index-packs.module.styl'

const LogoPacks = ({ data }) => {
  const intl = useIntl()
  return (
    <section className={cardsWrapper}>
      <div className={cardsHeader}>
        <h2 className={cardsTitle}>{intl.formatMessage({ id: `index.logoPacks` })}</h2>
        <LocalizedLink className={moreLink} to="/packs">
          {intl.formatMessage({ id: `index.viewMore` })}
          <ArrowIcon className={arrowIcon} />
        </LocalizedLink>
      </div>
      <div className={cardsContainer}>
        {data.allLogoPack.nodes.map(node => (
          <article key={node.id}>
            <LocalizedLink className={cardLink} to={node.slug}>
              <div className={itemImageWrapper}>
                {node.itemsInfo.slice(0, 9).map(info => (
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
                  <span className={seasonBadge}>{node.season}</span>
                  <h3 className={packName}>{node.name}</h3>
                </div>
                <GatsbyImage key={node.id} image={getImage(node.packInfo[0].pngPath)} alt="" />
              </footer>
            </LocalizedLink>
          </article>
        ))}
      </div>
    </section>
  )
}

export default LogoPacks
