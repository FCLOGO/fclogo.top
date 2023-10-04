import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link, useTranslation } from 'gatsby-plugin-react-i18next'

import ModalLink from '../helpers/modal-link'

import ArrowIcon from '../../static/assets/icons/arrowForward.inline.svg'

const LogoList = ({ data }) => {
  const { t } = useTranslation()
  return (
    <section className="flex-auto flex flex-col flex-nowrap mb-[40px]">
      <div className="h-header flex flex-row flex-nowrap items-center justify-between w-full font-semibold uppercase leading-none">
        <h2 className="flex-auto">{t(`index.cardTitle`)}</h2>
        <Link
          to="/logos"
          className="flex-initial py-xs px-sm rounded inline-flex items-center justify-center text-green hover:bg-green hover:bg-opacity-20"
        >
          {t(`index.viewMore`)}
          <ArrowIcon className="stroke-green h-xl w-xl ml-xs" />
        </Link>
      </div>

      {data.allLogo.nodes.length ? (
        <div className="w-full overflow-hidden grid justify-between gap-3xl grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))]">
          {data.allLogo.nodes.slice(0, 12).map(node => (
            <article
              key={node.id}
              className="bg-white rounded-lg border border-gray-1 hover:border-gray-2 shadow-card"
            >
              <ModalLink
                to={node.slug}
                className="relative overflow-hidden flex flex-col text-dark-gray"
                state={{
                  modal: true,
                  noScroll: true
                }}
              >
                <GatsbyImage
                  image={getImage(node.pngPath)}
                  alt={node.detailInfo[0].info[0].fullName}
                  className="m-[15%_20%]"
                />
                <footer className="w-full h-header flex flex-row flex-nowrap justify-between items-center content-center px-xl  border-t border-t-gray-1 border-dashed">
                  <h3 className="font-medium flex-auto whitespace-nowrap overflow-hidden text-ellipsis">
                    {node.detailInfo[0].info[0].shortName}
                  </h3>
                  {node.version === 0 ? (
                    ''
                  ) : (
                    <span className="font-mono mr-sm uppercase text-xs leading-3 p-xs rounded-[3px] bg-green text-white">
                      {node.version}
                    </span>
                  )}
                  <span className="uppercase text-xs p-xs leading-3 rounded-[3px] bg-green text-white">
                    {t(node.style)}
                  </span>
                </footer>
              </ModalLink>
            </article>
          ))}
        </div>
      ) : (
        <div className="pt-header">
          <h2 className="font-semibold text-center text-light-gray">{t(`index.noLogo`)}</h2>
        </div>
      )}
    </section>
  )
}

export default LogoList
