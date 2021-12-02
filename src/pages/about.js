import React from 'react'
import { graphql } from 'gatsby'
import { useIntl } from 'react-intl'
import { LocalizedLink } from 'gatsby-plugin-usei18n'
import { StaticImage } from 'gatsby-plugin-image'

import Layout from '../components/layout'
import Seo from '../components/seo'
import PageHero from '../components/page-hero'

import LogoIcon from '../../static/assets/icons/logo.inline.svg'
import ClubIcon from '../../static/assets/icons/club.inline.svg'
import CompIcon from '../../static/assets/icons/competition.inline.svg'
import CountryIcon from '../../static/assets/icons/country.inline.svg'
import ArrowIcon from '../../static/assets/icons/arrowForward.inline.svg'
import ChatIcon from '../../static/assets/icons/chat.inline.svg'

import {
  mainContent,
  inner,
  separator,
  statisticsWrapper,
  statistics,
  number,
  numTitle,
  moreStatistics,
  contributorSubtitle,
  contributorWrapper,
  contributors,
  contactButton
} from './about.module.styl'

const AboutPage = ({ data, pageContext }) => {
  const intl = useIntl()
  const nations = data.allSourceInfo.nodes.map(node => node.nation)
  const types = data.allSourceInfo.nodes.map(node => node.type)
  const countNation = Array.from(new Set(nations)).length
  const countTypes = types.reduce((allTypes, type) => {
    type in allTypes ? allTypes[type]++ : (allTypes[type] = 1)
    return allTypes
  }, {})
  return (
    <Layout pageContext={pageContext}>
      <Seo title={intl.formatMessage({ id: 'about.title' })} />
      <PageHero pageSlogan={intl.formatMessage({ id: 'about.slogan' }, { br: <br /> })} />
      <div className={mainContent}>
        <section>
          <div className={inner}>
            <h2>{intl.formatMessage({ id: 'about.title' })}</h2>
            <span className={separator}></span>
            <div>
              {intl.formatMessage(
                { id: 'about.content' },
                { p: (...chunks) => <p>{chunks}</p>, b: (...chunks) => <b>{chunks}</b> }
              )}
            </div>
          </div>
        </section>
        <section>
          <div className={inner}>
            <h2>{intl.formatMessage({ id: 'about.achievements' })}</h2>
            <span className={separator}></span>
            <div className={statisticsWrapper}>
              <div className={statistics}>
                <LogoIcon />
                <span className={number}>{data.allLogo.totalCount}</span>
                <span className={numTitle}>{intl.formatMessage({ id: 'about.logos' })}</span>
              </div>
              <div className={statistics}>
                <ClubIcon />
                <span className={number}>{countTypes.club ? countTypes.club : 0}</span>
                <span className={numTitle}>{intl.formatMessage({ id: 'about.clubs' })}</span>
              </div>
              <div className={statistics}>
                <CompIcon />
                <span className={number}>{countTypes.comp ? countTypes.comp : 0}</span>
                <span className={numTitle}>{intl.formatMessage({ id: 'about.comps' })}</span>
              </div>
              <div className={statistics}>
                <CountryIcon />
                <span className={number}>{countNation}</span>
                <span className={numTitle}>{intl.formatMessage({ id: 'about.cy' })}</span>
              </div>
            </div>
            <span className={moreStatistics}>
              <LocalizedLink to="/statistics">
                {intl.formatMessage({ id: 'about.moreStatistics' })}
                <ArrowIcon />
              </LocalizedLink>
            </span>
          </div>
        </section>
        <section>
          <div className={inner}>
            <h2>{intl.formatMessage({ id: 'about.contributorTitle' })}</h2>
            <span className={separator}></span>
            <p className={contributorSubtitle}>
              {intl.formatMessage({ id: 'about.contributorDes' })}
            </p>
            <div className={contributorWrapper}>
              <div className={contributors}>
                {data.allContributor.nodes.map(node => (
                  <a key={node.id} href={node.link} target="_blank">
                    <img src={node.avatar} alt={node.name} />
                    <span>@{node.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className={inner}>
            <h2>{intl.formatMessage({ id: 'about.contactTittle' })}</h2>
            <span className={separator}></span>
            <LocalizedLink to="/contact" className={contactButton}>
              <ChatIcon />
              <span>{intl.formatMessage({ id: 'about.contactButton' })}</span>
            </LocalizedLink>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default AboutPage

export const query = graphql`
  query ($locale: String!) {
    allLogo(filter: { fields: { locale: { eq: $locale } } }) {
      totalCount
    }
    allSourceInfo(filter: { fields: { locale: { eq: $locale } } }) {
      nodes {
        nation
        type
      }
    }
    allContributor {
      nodes {
        id
        name
        avatar
        link
      }
    }
  }
`
