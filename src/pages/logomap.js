import React, { useState, useRef, useCallback } from 'react'
import { StaticImage, GatsbyImage, getImage } from 'gatsby-plugin-image'
import { graphql } from 'gatsby'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import MapboxLanguage from '@mapbox/mapbox-gl-language'
import Map, { Layer, Source, Popup, FullscreenControl, NavigationControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import Layout from '../components/layout'
import Seo from '../components/seo'

const languageMap = {
  'zh-cn': 'zh-Hans',
  en: 'en',
  de: 'de'
  // 其他语言的映射...
}

const logomap = ({ data, pageContext }) => {
  // 初始化地图
  const mapRef = useRef()
  const [viewState, setViewState] = React.useState({
    longitude: 116.4,
    latitude: 39.9,
    zoom: 2.5
  })

  const MAP_LAYER_LIST = [
    'road-label',
    'waterway-label',
    'natural-line-label',
    'natural-point-label',
    'water-line-label',
    'water-point-label',
    'poi-label',
    'airport-label',
    'settlement-subdivision-label'
  ]

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
          MAP_LAYER_LIST.forEach(layerId => {
            map.removeLayer(layerId)
          })
        })
      }
    },
    [pageContext.language]
  )

  // 从数据中提取 clubs 和坐标，转换为 GeoJSON 格式
  const clubs = data.allSourceInfo.nodes
  const geojsonData = {
    type: 'FeatureCollection',
    features: clubs
      .filter(club => club.coordinates && club.coordinates.length === 2)
      .map(club => ({
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
    opacity: 0.2
  }

  return (
    <Layout>
      <div className="w-full m-[0_auto] flex-grow flex flex-col flex-nowrap items-start pt-[120px]">
        <section className="w-full m-[0_auto] px-xl flex flex-col overflow-visible h-full pb-header">
          <div className="rounded-lg bg-white overflow-hidden h-full">
            <Map
              {...viewState}
              onMove={evt => setViewState(evt.viewState)}
              mapStyle="mapbox://styles/mapbox/dark-v10"
              ref={mapRefCallback}
              style={{ width: '100%', height: '100%' }}
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
              <Source id="clubs" type="geojson" data={geojsonData}>
                <Layer {...circleLayerStyle} />
              </Source>

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
