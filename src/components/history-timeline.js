import React from 'react'
import { useIntl } from 'react-intl'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { LocalizedLink } from 'gatsby-plugin-usei18n'

import {
  timelineWrapper,
  timelineInner,
  timelineTitle,
  logoContainer,
  logoCard,
  cardLink,
  logoImage,
  versionText
} from './history-timeline.module.styl'

const HistoryTimline = props => {
  const intl = useIntl()
  const sortLogos = props.logos.sort((a, b) => b.version - a.version)
  return (
    <section className={timelineWrapper}>
      <div className={timelineInner}>
        <h3 className={timelineTitle}>{intl.formatMessage({ id: 'detail.historyTitle' })}</h3>
        <div className={logoContainer}>
          {sortLogos.map(logo => (
            <article key={logo.id} className={logoCard}>
              <LocalizedLink to={logo.slug} className={cardLink}>
                <GatsbyImage
                  image={getImage(logo.pngPath)}
                  alt={logo.version.toString()}
                  className={logoImage}
                />
                <span className={versionText}>{logo.version}</span>
              </LocalizedLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HistoryTimline
