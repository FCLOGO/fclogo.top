import React, { useState, useRef, useCallback } from 'react'
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
const CountryInfo = ({ countryData }) => {
  const { t } = useTranslation()
  return (
    <div className="text-gray overflow-y-scroll flex-grow">
      <ul className="mt-md">
        {Object.keys(countryData).map(nation => (
          <li
            key={nation}
            className="pb-lg mt-lg border-b border-dashed border-b-gray border-opacity-35 flex flex-col"
          >
            <span className="font-mono font-thin text-5xl">{countryData[nation].count}</span>
            <div className="flex flex-row items-center mt-xs">
              <GatsbyImage
                image={getImage(countryData[nation].flag[0].flag2)} // 从 clubs 找到对应的 logo
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
  const [viewState, setViewState] = React.useState({
    longitude: 120,
    latitude: 30,
    zoom: 2.5
  })

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
      // 如果国家不存在于 accumulator 中，则初始化
      if (!accumulator[club.nation]) {
        accumulator[club.nation] = {
          count: 0,
          flag: club.nationalFlag
        }
      }
      accumulator[club.nation].count += 1
    }
    return accumulator
  }, {})

  // 提取 club 坐标数据，转换为 GeoJSON 格式
  const geojsonData = {
    type: 'FeatureCollection',
    features: clubs.map(club => ({
      type: 'Feature',
      properties: {
        id: club.id,
        name: club.info[0].fullName
      },
      geometry: {
        type: 'Point',
        coordinates: club.coordinates
      }
    }))
  }

  // 定义标记样式
  const circleLayerStyle = {
    id: 'club-points',
    type: 'circle',
    paint: {
      'circle-color': '#4264fb',
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
    }
  }

  const onLeave = () => {
    setHoveredClub(null)
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
      <div className="w-full m-[0_auto] flex-grow flex flex-col flex-nowrap items-start pt-[120px]">
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
              <div className="absolute w-[29px] h-[29px] right-xl top-[70px] p-xs bg-white opacity-30 z-50 rounded">
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
              <div className="text-gray absolute bg-black h-full w-[280px] bg-opacity-55 p-xl pb-[40px] flex flex-col justify-between">
                <header className="border-b border-b-gray border-opacity-35">
                  <ClubIcon className="w-[48px] h-[48px] stroke-gray stroke-[24] mb-md" />
                  <h3 className="uppercase font-semibold text-lg tracking-wider mb-md">
                    {t('clubStatistics')}
                  </h3>
                </header>
                <CountryInfo countryData={nationCount} />
                <div className="flex flex-col pt-lg border-t border-t-gray border-opacity-35">
                  <span className="font-mono font-thin text-6xl">{clubs.length}</span>
                  <span className="">{t('totalCount')}</span>
                </div>
              </div>

              {hoveredClub && (
                <Popup
                  longitude={hoveredClub.geometry.coordinates[0]}
                  latitude={hoveredClub.geometry.coordinates[1]}
                  closeOnClick={false}
                  closeButton={false}
                  maxWidth="140px"
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

export const Head = ({ data }) => {
  const locales = data.locales.edges[0].node.data
  let obj = undefined
  if (locales) {
    obj = JSON.parse(locales)
  }
  return <Seo title={obj?.maptitle} />
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
        coordinates
        info {
          fullName
        }
        nation
        nationalFlag {
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
