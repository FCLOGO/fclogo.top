import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link, useTranslation } from 'gatsby-plugin-react-i18next'

import ModalLink from '../helpers/modal-link'

const RandomLogo = ({ data }) => {
  const { t } = useTranslation()
  const newLogos = Array.from(data.allLogo.nodes)
  return (
    <section className="flex-auto flex flex-col flex-nowrap mb-[40px]">
      <div className="h-header flex flex-row flex-nowrap items-center justify-between w-full font-semibold uppercase leading-none">
        <h2 className="flex-auto">{t(`index.randomTitle`)}</h2>
      </div>
      <div className="w-full overflow-hidden grid justify-between gap-xl grid-cols-[repeat(auto-fill,_minmax(110px,_1fr))]">
        {newLogos
          .sort(() => {
            return Math.random() - 0.5
          })
          .slice(0, 10)
          .map(node => (
            <article
              key={node.id}
              className="bg-white rounded-lg border border-gray-1 hover:border-gray-2 shadow-card"
            >
              <div>
                <ModalLink
                  to={node.slug}
                  state={{
                    modal: true,
                    noScroll: true
                  }}
                  className="flex p-[1vw] flex-col flex-wrap items-center"
                >
                  <GatsbyImage
                    image={getImage(node.pngPath)}
                    alt={node.detailInfo[0].info[0].fullName}
                  />
                </ModalLink>
              </div>
            </article>
          ))}
      </div>
    </section>
  )
}
export default RandomLogo
