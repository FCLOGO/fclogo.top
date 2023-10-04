import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link, useTranslation } from 'gatsby-plugin-react-i18next'

import ModalLink from '../helpers/modal-link'

const LogoTimeline = props => {
  const { t } = useTranslation()
  // 历史徽标根据版本时间重新排序
  const sortLogos = props.logos.sort((a, b) => b.version - a.version)
  return (
    <section className="w-full px-xl py-[40px] flex flex-col border-b border-b-gray-1 timeline-wrapper">
      <div className="w-full mb-xl">
        <h3 className="uppercase font-semibold">{t('detail.historyTitle')}</h3>
      </div>
      <div className="w-full flex-auto grid justify-between grid-cols-[repeat(auto-fill,_minmax(150px,_1fr))] gap-xl">
        {sortLogos.map(logo => (
          <article
            key={logo.id}
            className="border border-gray-1 hover:border-gray-2 shadow-card rounded-md bg-white"
          >
            <ModalLink
              to={logo.slug}
              state={{
                modal: true,
                noScroll: true
              }}
              className="flex flex-col items-center"
            >
              <GatsbyImage
                image={getImage(logo.pngPath)}
                alt={logo.version.toString()}
                className="my-lg mx-auto"
              />
              <span className="w-full h-[40px] font-mono border-t border-dashed border-t-gray-1 inline-flex justify-center items-center">
                {logo.version}
                {logo.isDoubtful ? t('sidebar.doubtful') : ''}
              </span>
            </ModalLink>
          </article>
        ))}
      </div>
    </section>
  )
}

export default LogoTimeline
