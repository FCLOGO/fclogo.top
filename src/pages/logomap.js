import React, { useState, useRef, useMemo, useCallback } from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { graphql } from 'gatsby'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import MapboxLanguage from '@mapbox/mapbox-gl-language'
import Map, { Layer, Source, Popup, FullscreenControl, NavigationControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import Layout from '../components/layout'
import Seo from '../components/seo'

import OpenEyeIcon from '../../static/assets/icons/openEye.inline.svg'
import CloseEyeIcon from '../../static/assets/icons/closeEye.inline.svg'
import ClubIcon from '../../static/assets/icons/club.inline.svg'

const languageMap = {
  'zh-cn': 'zh-Hans',
  en: 'en',
  de: 'de'
  // 其他语言的映射...
}

// club 数量统计
const CountryInfo = ({ countryData, onCountryClick }) => {
  const { t } = useTranslation()
  return (
    <div className="text-gray overflow-y-scroll flex-grow">
      <ul className="mt-md">
        {countryData.map(({ nation, count, flag }) => (
          <li
            key={nation}
            onClick={() => onCountryClick(flag[0].center, flag[0].zoom)}
            className="cursor-pointer w-full pb-lg mt-lg border-b border-dashed border-b-gray border-opacity-35 flex flex-col"
          >
            <span className="font-mono font-thin text-5xl map:text-4xl">{count}</span>
            <div className="flex flex-row items-center mt-xs">
              <GatsbyImage
                image={getImage(flag[0].flag2)} // 从 clubs 找到对应的 logo
                alt={nation}
              />
              <span className="ml-sm">{t(nation)}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

const logomap = ({ data, pageContext }) => {
  const { t } = useTranslation()
  // 初始化地图
  const mapRef = useRef()
  // 默认的经度、纬度和缩放级别
  const defaultViewState = {
    longitude: 0,
    latitude: 10,
    zoom: 2.2
  }
  const [viewState, setViewState] = React.useState(defaultViewState)

  const REMOVE_LAYER_LIST = [
    'road-label-simple',
    'waterway-label',
    'natural-line-label',
    'natural-point-label',
    'water-line-label',
    'water-point-label',
    'poi-label',
    'airport-label',
    'settlement-subdivision-label' //街道社区标签
  ]

  const CONTROL_LAYER_LIST = [
    'settlement-minor-label', // 县级标签
    'settlement-major-label', //市级标签
    'state-label', //省级标签
    'country-label', //国家标签
    'continent-label' //洲标签
  ]
  const [layersVisible, setLayersVisible] = useState(true)
  const [hoveredClub, setHoveredClub] = useState(null)
  const mapRefCallback = useCallback(
    ref => {
      if (ref) {
        mapRef.current = ref
        const map = ref.getMap()
        // 获取页面的语言，并找到对应的 Mapbox 语言代码
        const language = languageMap[pageContext.language] || 'en' // 默认使用英语
        map.addControl(new MapboxLanguage({ defaultLanguage: language }))

        map.on('load', () => {
          REMOVE_LAYER_LIST.forEach(layerId => {
            map.removeLayer(layerId)
          })
          if (layersVisible) {
            CONTROL_LAYER_LIST.forEach(layerId => {
              map.setLayoutProperty(layerId, 'visibility', 'visible')
            })
          }
        })
      }
    },
    [pageContext.language, layersVisible]
  )

  // 从数据中提取包括坐标数据的 clubs
  const clubs = data.allSourceInfo.nodes.filter(
    club => club.coordinates && club.coordinates.length === 2
  )

  // 统计各国 club 数量
  const nationCount = clubs.reduce((accumulator, club) => {
    if (club.nation) {
      accumulator[club.nation] = accumulator[club.nation] || {
        count: 0,
        flag: club.nationalInfo
      }
      // 增加计数
      accumulator[club.nation].count += 1
    }
    return accumulator
  }, {})

  // 将 nationCount 转换为数组并排序
  const sortedNationCount = useMemo(() => {
    return Object.entries(nationCount)
      .map(([nation, data]) => ({ nation, ...data }))
      .sort((a, b) => b.count - a.count)
  }, [nationCount])

  // 提取 club 坐标数据，转换为 GeoJSON 格式
  const geojsonData = useMemo(
    () => ({
      type: 'FeatureCollection',
      features: clubs.map(club => ({
        type: 'Feature',
        properties: {
          id: club.id,
          name: club.info[0].fullName,
          status: club.status
        },
        geometry: {
          type: 'Point',
          coordinates: club.coordinates
        }
      }))
    }),
    [clubs]
  )

  // 定义标记样式
  const circleLayerStyle = {
    id: 'club-points',
    type: 'circle',
    paint: {
      'circle-color': [
        'case',
        ['==', ['get', 'status'], 'active'],
        '#4264fb',
        ['==', ['get', 'status'], 'inactive'],
        '#7f8c8d',
        '#4264fb' // default to blue if not matched
      ],
      'circle-radius': 6,
      'circle-stroke-width': 2,
      'circle-stroke-color': '#ffffff'
    }
  }

  // 显示/隐藏位置标签
  const toggleLayersVisibility = () => {
    const map = mapRef.current.getMap()
    const newVisibility = layersVisible ? 'none' : 'visible'
    CONTROL_LAYER_LIST.forEach(layerId => {
      if (map.getLayer(layerId)) {
        map.setLayoutProperty(layerId, 'visibility', newVisibility)
      }
    })
    setLayersVisible(!layersVisible)
  }

  const onHover = e => {
    const features = e.features
    if (features.length > 0) {
      const feature = features[0]
      const coordinates = feature.geometry.coordinates.slice() // 复制经纬度
      // 检查并调整经度，确保它在有效范围内
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
      }
      // 设置 hoveredClub 的状态
      setHoveredClub({ ...feature, geometry: { coordinates } }) // 添加调整后的坐标

      // 改变鼠标光标样式为指针
      mapRef.current.getCanvas().style.cursor = 'pointer'
    }
  }

  const onLeave = () => {
    setHoveredClub(null)
    mapRef.current.getCanvas().style.cursor = '' // 恢复默认光标样式
  }

  // 点击国家时更新地图中心
  const handleCountryClick = (center, zoom) => {
    setViewState({
      ...viewState,
      longitude: center[0],
      latitude: center[1],
      zoom: zoom
    })
  }

  // 点击合计数量时恢复到默认中心及缩放级别
  const handleTotalCountClick = () => {
    setViewState(defaultViewState)
  }

  // 查找对应的 logo 数据
  const getClubLogo = clubId => {
    const club = clubs.find(c => c.id === clubId)
    return club && club.latestLogo[0]?.pngPath // 确保安全访问
  }

  // 全屏按钮样式
  const fullscreenButton = {
    position: 'absolute',
    marginTop: '30px',
    right: '10px',
    opacity: 0.3
  }

  return (
    <Layout>
      <div className="w-full m-[0_auto] flex-grow flex flex-col flex-nowrap items-start pt-[120px] min-h-[800px]">
        <section className="w-full m-[0_auto] px-xl flex flex-col overflow-visible h-full pb-header">
          <div className="rounded-lg bg-white overflow-hidden h-full">
            <Map
              {...viewState}
              onMove={evt => setViewState(evt.viewState)}
              mapStyle="mapbox://styles/mapbox/dark-v11"
              ref={mapRefCallback}
              style={{ width: '100%', height: '100%' }}
              projection={'mercator'} //设置地图投影
              mapboxAccessToken={process.env.GATSBY_MAPBOX_ACCESS_TOKEN}
              interactiveLayerIds={['club-points']}
              onMouseEnter={onHover}
              onMouseLeave={onLeave}
            >
              <FullscreenControl style={fullscreenButton} />
              <NavigationControl
                showCompass={false}
                position={'bottom-right'}
                style={{ opacity: 0.3 }}
              />
              <div className="absolute w-[29px] h-[29px] right-xl top-[70px] p-xs bg-white opacity-30 z-50 rounded map:hidden">
                <button onClick={toggleLayersVisibility}>
                  {layersVisible ? (
                    <CloseEyeIcon className="w-full h-full fill-dark-gray" />
                  ) : (
                    <OpenEyeIcon className="w-full h-full fill-dark-gray" />
                  )}
                </button>
              </div>

              <Source id="clubs" type="geojson" data={geojsonData}>
                <Layer {...circleLayerStyle} />
              </Source>

              <div className="text-gray absolute bg-black h-full w-[280px] map:w-[160px] bg-opacity-85 p-xl pb-[40px] flex flex-col justify-between">
                <header className="border-b border-b-gray border-opacity-35">
                  <ClubIcon className="w-[48px] h-[48px] stroke-gray stroke-[24] mb-md" />
                  <h3 className="uppercase font-semibold text-lg tracking-wider mb-md">
                    {t('clubStatistics')}
                  </h3>
                </header>
                <CountryInfo countryData={sortedNationCount} onCountryClick={handleCountryClick} />
                <div
                  onClick={handleTotalCountClick}
                  className="cursor-pointer w-full flex flex-col pt-lg border-t border-t-gray border-opacity-35"
                >
                  <span className="font-mono font-thin text-6xl map:text-4xl">{clubs.length}</span>
                  <span className="">{t('totalCount')}</span>
                </div>
              </div>

              <div className="absolute bg-white bg-opacity-50 h-xl bottom-zero right-[275px] map:right-[40px] map:bottom-md map:rounded-[10px] pl-[6px] pr-[6px] flex flex-row items-center">
                <span className="inline-block bg-[#4264fb] w-md h-md rounded-md border-2 border-white mr-xs"></span>
                {t('mapInfo_1.1')}
                <span className="inline-block bg-[#7f8c8d] w-md h-md rounded-md border-2 border-white ml-xs mr-xs"></span>
                {t('mapInfo_1.2')}
              </div>

              {hoveredClub && (
                <Popup
                  longitude={hoveredClub.geometry.coordinates[0]}
                  latitude={hoveredClub.geometry.coordinates[1]}
                  closeOnClick={false}
                  closeButton={false}
                  maxWidth="120px"
                >
                  <div className="flex flex-col items-center content-center">
                    {getClubLogo(hoveredClub.properties.id) && (
                      <GatsbyImage
                        image={getImage(getClubLogo(hoveredClub.properties.id))} // 从 clubs 找到对应的 logo
                        alt={hoveredClub.properties.name}
                      />
                    )}
                    <footer className="pt-sm text-center">
                      <h3 className="font-medium">{hoveredClub.properties.name}</h3>
                    </footer>
                  </div>
                </Popup>
              )}
            </Map>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default logomap

export const Head = ({ data, pageContext }) => {
  const locales = data.locales.edges[0].node.data
  const { i18n, language } = pageContext
  let obj = undefined
  if (locales) {
    obj = JSON.parse(locales)
  }
  return (
    <Seo
      title={`${obj?.maptitle} | ${obj?.hometitle}`}
      description={obj?.indexDescription}
      path={i18n.path}
      locale={language}
      languages={i18n.languages}
      originalPath={i18n.originalPath}
    />
  )
}

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    allSourceInfo(filter: { type: { eq: "club" }, fields: { locale: { eq: $language } } }) {
      nodes {
        id
        status
        coordinates
        info {
          fullName
        }
        nation
        nationalInfo {
          center
          zoom
          flag2 {
            childImageSharp {
              gatsbyImageData(width: 20, placeholder: BLURRED, formats: WEBP, layout: CONSTRAINED)
            }
          }
        }
        latestLogo {
          pngPath {
            childImageSharp {
              gatsbyImageData(width: 96, placeholder: BLURRED, formats: WEBP, layout: CONSTRAINED)
            }
          }
        }
      }
    }
  }
`
