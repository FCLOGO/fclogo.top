import React from 'react'
import { Link, useTranslation } from 'gatsby-plugin-react-i18next'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import ModalLink from '../helpers/modal-link'

import ArrowIcon from '../../static/assets/icons/arrowForward.inline.svg'

const IndexPack = ({ data }) => {
  const { t } = useTranslation()
  return (
    <section className="flex-auto flex flex-col flex-nowrap mb-[40px]">
      <div className="h-header flex flex-row flex-nowrap items-center justify-between w-full font-semibold uppercase leading-none">
        <h2 className="flex-auto">{t(`index.logoPacks`)}</h2>
        <Link
          to="/packs"
          className="flex-initial py-xs px-sm rounded inline-flex items-center justify-center text-green hover:bg-green hover:bg-opacity-20"
        >
          {t(`index.viewMore`)}
          <ArrowIcon className="stroke-green h-xl w-xl ml-xs" />
        </Link>
      </div>
      <div className="w-full overflow-hidden grid justify-between items-stretch gap-3xl grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))]">
        {data.allLogoPack.nodes.map(node => (
          <article
            key={node.id}
            className="bg-white rounded-lg border border-gray-1 hover:border-gray-2 shadow-card"
          >
            <ModalLink
              to={node.slug}
              state={{
                modal: true,
                noScroll: true
              }}
              className="relative overflow-hidden flex flex-col text-dark-gray"
            >
              <div className="w-full p-xl grid justify-between grid-cols-[repeat(3,_minmax(86px,_1fr))] grid-rows-[repeat(3,_minmax(86px,_1fr))]">
                {node.itemsInfo.slice(0, 9).map(info => (
                  <GatsbyImage
                    key={info.sourceID}
                    image={getImage(info.pngPath)}
                    alt={info.detailInfo[0].info[0].fullName}
                    className="m-[10%]"
                  />
                ))}
              </div>
              <footer className="w-full h-[80px] flex flex-row flex-nowrap justify-between items-center content-center px-xl  border-t border-t-gray-1 border-dashed">
                <div className="flex flex-col justify-center content-start items-start">
                  <span className="font-mono uppercase text-xs p-xs leading-3 rounded-[3px] bg-green text-white flex-initial">
                    {node.season}
                  </span>
                  <h3 className="mt-xs font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                    {node.name}
                  </h3>
                </div>
                <GatsbyImage
                  key={node.id}
                  image={getImage(node.packInfo[0].pngPath)}
                  alt={node.name}
                />
              </footer>
            </ModalLink>
          </article>
        ))}
      </div>
    </section>
  )
}

export default IndexPack
