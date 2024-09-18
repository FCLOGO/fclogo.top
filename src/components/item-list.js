import React, { useState, useEffect, useRef } from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link, useTranslation } from 'gatsby-plugin-react-i18next'
import AdSense from 'react-adsense'
import ModalLink from '../helpers/modal-link'

// Google Adsense
const DetailAdsense = () => {
  return (
    <AdSense.Google
      style={{ display: 'block' }}
      format="auto"
      responsive="true"
      client="ca-pub-9573165480183467"
      slot="1229678468"
    />
  )
}

const ItemList = ({ allItems }) => {
  const { t } = useTranslation()

  // 徽标列表的状态
  const [list, setList] = useState([...allItems.slice(0, 20)])
  // 触发加载更多的状态
  const [loadMore, setLoadMore] = useState(false)
  // 判断是否还有内容需要加载
  const [hasMore, setHasMore] = useState(allItems.length > 20)
  // 为列表容器 div 设置 ref
  const loadRef = useRef()
  // 处理 intersection div 容器
  const handleObserver = entities => {
    const target = entities[0]
    if (target.isIntersecting) {
      setLoadMore(true)
    }
  }
  // 初始化 IntersectionObserver
  useEffect(() => {
    var options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0
    }
    const observer = new IntersectionObserver(handleObserver, options)
    if (loadRef.current) {
      observer.observe(loadRef.current)
    }
  }, [])
  // 加载更多徽标
  useEffect(() => {
    if (loadMore && hasMore) {
      const currentLength = list.length
      const isMore = currentLength < allItems.length
      const nextResults = isMore ? allItems.slice(currentLength, currentLength + 20) : []
      setList([...list, ...nextResults])
      setLoadMore(false)
    }
  }, [loadMore, hasMore]) //eslint-disable-line
  // 检查是否还有更多
  useEffect(() => {
    const isMore = list.length < allItems.length
    setHasMore(isMore)
  }, [list]) //eslint-disable-line
  return (
    <div className="w-full m-[0_auto] flex-grow pt-[160px] flex flex-row flex-wrap items-start">
      <div className="p-xl w-full border-b border-b-gray-1 text-center">
        <DetailAdsense />
      </div>
      <section className="w-full px-xl flex flex-col flex-nowrap mx-auto mb-[100px]">
        {allItems.length ? (
          <>
            <div className="w-full overflow-hidden grid mt-3xl justify-between gap-2xl grid-cols-[repeat(auto-fill,_minmax(260px,_1fr))]">
              {list.map(item => (
                <article
                  key={item.id}
                  className="bg-white rounded-lg border border-gray-1 hover:border-gray-2 shadow-card"
                >
                  {item.internal.type === `logo` && (
                    <ModalLink
                      to={item.slug}
                      state={{
                        modal: true,
                        noScroll: true
                      }}
                      className="relative overflow-hidden flex flex-col text-dark-gray"
                    >
                      <GatsbyImage
                        image={getImage(item.pngPath)}
                        alt={item.detailInfo[0].info[0].fullName}
                        className="m-[15%_20%]"
                      />
                      <footer className="w-full h-header flex flex-row flex-nowrap justify-between items-center content-center px-xl  border-t border-t-gray-1 border-dashed">
                        <h3 className="font-medium flex-auto whitespace-nowrap overflow-hidden text-ellipsis">
                          {item.detailInfo[0].info[0].shortName}
                        </h3>
                        {item.version === 0 ? (
                          ''
                        ) : (
                          <span className="font-mono mr-sm uppercase text-xs leading-3 p-xs rounded-[3px] bg-green text-white">
                            {item.version}
                          </span>
                        )}
                        <span className="uppercase text-xs p-xs leading-3 rounded-[3px] bg-green text-white">
                          {t(item.style)}
                        </span>
                      </footer>
                    </ModalLink>
                  )}
                  {item.internal.type === `logoPack` && (
                    <Link
                      to={item.slug}
                      className="relative overflow-hidden flex flex-col text-dark-gray"
                    >
                      <div className="w-full min-h-[260px] overflow-hidden p-md grid justify-between grid-cols-[repeat(3,_minmax(70px,_1fr))] grid-rows-[repeat(3,_minmax(70px,_1fr))]">
                        {item.itemsInfo.slice(0, 9).map(info => (
                          <GatsbyImage
                            key={info.souceID}
                            image={getImage(info.pngPath)}
                            alt={info.detailInfo[0].info[0].fullName}
                            className="m-[10%]"
                          />
                        ))}
                      </div>
                      <footer className="w-full h-[80px] flex flex-row flex-nowrap justify-between items-center content-center px-xl  border-t border-t-gray-1 border-dashed">
                        <span className="font-mono uppercase text-xs p-xs mr-xs leading-3 rounded-[3px] bg-green text-white flex-none">
                          {t(item.season)}
                        </span>
                        <h3 className="flex-grow mt-xs font-medium whitespace-nowrap overflow-hidden text-ellipsis text-left">
                          {item.name}
                        </h3>
                        <GatsbyImage
                          key={item.id}
                          image={getImage(item.packInfo[0].pngPath)}
                          alt={item.name}
                          className="flex-shrink-0"
                        />
                      </footer>
                    </Link>
                  )}
                </article>
              ))}
            </div>
            <div
              ref={loadRef}
              className="pt-header w-full flex flex-row justify-between content-center items-center"
            >
              <span className="w-full h-[1px] bg-gray-2 flex-auto"></span>
              {hasMore ? (
                <span className="text-light-gray uppercase tracking-[0.3rem] font-semibold text-xs mx-md flex-none">
                  {t('index.loading')}
                </span>
              ) : (
                <span className="text-light-gray uppercase tracking-[0.3rem] font-semibold text-xs mx-md flex-none">
                  {t('index.noMore')}
                </span>
              )}
              <span className="w-full h-[1px] bg-gray-2 flex-auto"></span>
            </div>
          </>
        ) : (
          <div className="pt-header w-full text-center">
            <h2 className="font-semibold text-light-gray">{t('index.noLogo')}</h2>
          </div>
        )}
      </section>
    </div>
  )
}

export default ItemList
