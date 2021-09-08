import React from 'react'
import { useIntl } from 'react-intl'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { LocalizedLink } from 'gatsby-plugin-usei18n'

import {
  cardsWrapper,
  cardsHeader,
  cardsTitle,
  cardsContainer,
  logoCard,
  cardLink
} from './indexRandom.module.styl'

const RandomLogo = ({ data }) => {
  const intl = useIntl()
  const newLogos = Array.from(data.allLogo.nodes)
  return (
    <section className={cardsWrapper}>
      <div className={cardsHeader}>
        <h2 className={cardsTitle}>{intl.formatMessage({ id: `index.randomTitle` })}</h2>
      </div>
      <div className={cardsContainer}>
        {newLogos
          .sort(() => {
            return Math.random() - 0.5
          })
          .slice(0, 10)
          .map(node => (
            <article key={node.id} className={logoCard}>
              <div>
                <LocalizedLink className={cardLink} to={node.slug}>
                  <GatsbyImage
                    image={getImage(node.pngPath)}
                    alt={node.detailInfo[0].info[0].fullName[1]}
                  />
                </LocalizedLink>
              </div>
            </article>
          ))}
      </div>
    </section>
  )
}

export default RandomLogo
