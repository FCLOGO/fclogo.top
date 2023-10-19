import React, { useEffect, useState } from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import FetchDownloadData from '../../lib/fetch-download-data'
import ModalLink from '../../helpers/modal-link'

import ArrowIcon from '../../../static/assets/icons/arrowForward.inline.svg'

const TopDownloads = ({ allLogo }) => {
  const { t } = useTranslation()
  const [topDownloads, setTopDownloads] = useState([])
  useEffect(() => {
    const getTopDownloads = async () => {
      const downloadData = await FetchDownloadData()

      // 匹配项目并添加其他数据
      const updatedDownloadData = downloadData.map(item => {
        const matchedItem = allLogo.find(node => node.logoID === item.logoID)
        if (matchedItem) {
          return {
            ...item,
            slug: matchedItem.slug,
            fullName: matchedItem.detailInfo[0].info[0].fullName,
            localName: matchedItem.detailInfo[0].info[0].localName,
            version: matchedItem.version,
            style: matchedItem.style,
            pngPath: matchedItem.pngPath
          }
        }
        return item
      })

      setTopDownloads(updatedDownloadData)
    }
    // 清理函数以取消异步操作和处理内存泄漏
    let isMounted = true
    getTopDownloads()
    return () => {
      isMounted = false
    }
  }, [])
  return (
    <div className="flex flex-col mx-xl">
      <h3 className="font-semibold text-left mb-lg">{t('search.topDownloads')}</h3>
      <section>
        {topDownloads.map(item => (
          <article key={item.logoID}>
            <ModalLink
              to={item.slug}
              state={{
                modal: true,
                noScroll: true
              }}
              className="w-full h-header flex flex-row flex-nowrap justify-between items-center bg-gray p-md mb-md rounded-md group hover:bg-green hover:text-white"
            >
              <GatsbyImage
                image={getImage(item.pngPath)}
                alt={item.fullName}
                className="flex-none h-[40px] w-[40px] mr-lg"
              />
              <div className="flex-1 flex flex-col justify-center text-left">
                <h4 className="mb-xs">{item.fullName}</h4>
                <span className="text-xs">{item.localName}</span>
              </div>
              <div className="mx-md flex justify-between items-center content-center">
                <span className="font-mono mr-sm uppercase text-xs leading-3 px-sm py-xs rounded-full text-light-gray group-hover:text-white border border-light-gray group-hover:border-gray">
                  {item.version}
                </span>
                <span className="uppercase text-xs px-sm py-xs leading-3 rounded-full text-light-gray group-hover:text-white border border-light-gray group-hover:border-gray">
                  {t(item.style)}
                </span>
              </div>
              <ArrowIcon className="w-lg h-lg stroke-dark-gray group-hover:stroke-white" />
            </ModalLink>
          </article>
        ))}
      </section>
    </div>
  )
}

export default TopDownloads
