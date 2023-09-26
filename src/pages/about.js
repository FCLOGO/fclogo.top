import React from 'react'
import { graphql } from 'gatsby'
import { Link, useTranslation } from 'gatsby-plugin-react-i18next'

import Layout from '../components/layout'
import Seo from '../components/seo'
import PageHero from '../components/page-hero'

import LogoIcon from '../../static/assets/icons/logo.inline.svg'
import ClubIcon from '../../static/assets/icons/club.inline.svg'
import CompIcon from '../../static/assets/icons/competition.inline.svg'
import CountryIcon from '../../static/assets/icons/country.inline.svg'
import ArrowIcon from '../../static/assets/icons/arrowForward.inline.svg'

const About = ({ data }) => {
  const { t } = useTranslation()
  const nations = data.allSourceInfo.nodes.map(node => node.nation)
  const types = data.allSourceInfo.nodes.map(node => node.type)
  const countNation = Array.from(new Set(nations.filter(e => e))).length
  const countTypes = types.reduce((allTypes, type) => {
    type in allTypes ? allTypes[type]++ : (allTypes[type] = 1)
    return allTypes
  }, {})
  return (
    <Layout>
      <Seo title={t('about.title')} />
      <PageHero pageSlogan={t('about.slogan')} />
      <div className="w-full m-[0_auto] flex-grow flex flex-col items-center justify-center py-header px-xl">
        <section className="w-full">
          <div className="max-w-[1280px] m-[0_auto] text-center mb-header flex flex-col items-center justify-center">
            <h2 className="inline-block text-xl font-semibold uppercase mb-md tracking-wider">
              {t('about.title')}
            </h2>
            <span className="block bg-gray-1 w-header h-mini mb-2xl"></span>
            <div
              className="prose"
              dangerouslySetInnerHTML={{
                __html: t('about.content')
              }}
            />
          </div>
        </section>
        <section className="w-full">
          <div className="max-w-[1280px] m-[0_auto] text-center mb-header flex flex-col items-center justify-center">
            <h2 className="inline-block text-xl font-semibold uppercase mb-md tracking-wider">
              {t('about.achievements')}
            </h2>
            <span className="block bg-gray-1 w-header h-mini mb-2xl"></span>
            <div className="mt-3xl flex flex-row justify-center items-center w-full tablet:flex-wrap">
              <div className="flex flex-col justify-center items-center w-1/5 px-3xl mb-header tablet:w-1/2">
                <LogoIcon className="w-header h-header p-sm mb-xl stroke-gray-2 stroke-[24]" />
                <span className="font-semibold text-6xl text-green">{data.allLogo.totalCount}</span>
                <span className="uppercase font-semibold text-light-gray">{t('about.logos')}</span>
              </div>
              <div className="flex flex-col justify-center items-center w-1/5 px-3xl mb-header tablet:w-1/2">
                <ClubIcon className="w-header h-header p-sm mb-xl stroke-gray-2 stroke-[24]" />
                <span className="font-semibold text-6xl text-green">
                  {countTypes.club ? countTypes.club : 0}
                </span>
                <span className="uppercase font-semibold text-light-gray">{t('about.clubs')}</span>
              </div>
              <div className="flex flex-col justify-center items-center w-1/5 px-3xl mb-header tablet:w-1/2">
                <CompIcon className="w-header h-header p-sm mb-xl stroke-gray-2 stroke-[24]" />
                <span className="font-semibold text-6xl text-green">
                  {countTypes.comp ? countTypes.comp : 0}
                </span>
                <span className="uppercase font-semibold text-light-gray">{t('about.comps')}</span>
              </div>
              <div className="flex flex-col justify-center items-center w-1/5 px-3xl mb-header tablet:w-1/2">
                <CountryIcon className="w-header h-header p-sm mb-xl stroke-gray-2 stroke-[24]" />
                <span className="font-semibold text-6xl text-green">{countNation}</span>
                <span className="uppercase font-semibold text-light-gray">{t('about.cy')}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default About

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
    allLogo(filter: { fields: { locale: { eq: $language } } }) {
      totalCount
    }
    allSourceInfo(filter: { fields: { locale: { eq: $language } } }) {
      nodes {
        nation
        type
      }
    }
  }
`
