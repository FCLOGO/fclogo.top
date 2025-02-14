import React from 'react'
import { Link, graphql } from 'gatsby'
import { StaticImage, GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useTranslation } from 'gatsby-plugin-react-i18next'

import Layout from '../components/layout'
import Seo from '../components/seo'
import PageHero from '../components/page-hero'

const Contribution = ({ data }) => {
  const { t } = useTranslation()
  const totalCount = data.allLogo.totalCount
  const contributors = data.allContributor.nodes.map(contributor => ({
    ...contributor,
    percentage: ((contributor.logoCount / totalCount) * 100).toFixed(2)
  }))

  const defaultContributor = {
    ctrbID: 'default',
    name: 'FCLOGO',
    logoCount:
      totalCount - contributors.reduce((sum, contributor) => sum + contributor.logoCount, 0),
    percentage: (
      ((totalCount - contributors.reduce((sum, contributor) => sum + contributor.logoCount, 0)) /
        totalCount) *
      100
    ).toFixed(2)
  }

  const allContributors = [...contributors, defaultContributor].sort(
    (a, b) => b.logoCount - a.logoCount
  )

  return (
    <Layout>
      <PageHero pageSlogan={t('contribution.slogan')} subtitle={t('contribution.subtitle')} />
      <div className="w-full mx-auto mt-xl mb-[100px] py-header px-[40px] max-w-[1400px] flex-auto flex flex-col flex-nowrap flex-grow items-start">
        <section className="flex-auto flex flex-col flex-nowrap mb-[40px] w-full">
          <div className="w-full mt-xl mb-xl">
            <div className="flex flex-col">
              {allContributors.map(contributor => (
                <div key={contributor.ctrbID} className="flex items-center justify-between mb-xl">
                  <div className="w-[160px] flex flex-row flex-nowrap items-center mr-lg">
                    {contributor.avatar ? (
                      <GatsbyImage
                        image={getImage(contributor.avatar)}
                        alt={contributor.name}
                        className="mr-md rounded-[50%] flex-shrink-0"
                      />
                    ) : (
                      <StaticImage
                        src="../../static/assets/images/avatar.png"
                        alt="FCLOGO"
                        placeholder="blurred"
                        layout="constrained"
                        formats={['webp']}
                        width={40}
                        height={40}
                        className="mr-md rounded-[50%] flex-shrink-0"
                      />
                    )}
                    {contributor.name}
                  </div>
                  <div className="bg-gray-2 flex-grow rounded-[4px]">
                    <div
                      className="bg-blue text-xs leading-none h-xl rounded-[4px] text-center text-white"
                      style={{ width: `${contributor.percentage}%` }}
                    ></div>
                  </div>
                  <div className="font-mono text-base w-[10%] ml-lg">{contributor.logoCount}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full flex flex-col items-center">
          <h2 className="text-2xl uppercase font-semibold tracking-wider mb-md indent-md">
            <Link to="/support/how-to-contribute-a-logo/" className="hover:border-b-2">
              {t('contributeLogo')}
            </Link>
          </h2>
        </section>
      </div>
    </Layout>
  )
}

export default Contribution

export const Head = ({ data, pageContext }) => {
  const locales = data.locales.edges[0].node.data
  const { i18n, language } = pageContext
  let obj = undefined
  if (locales) {
    obj = JSON.parse(locales)
  }
  return (
    <Seo
      title={`${obj?.contributiontitle} | ${obj?.hometitle}`}
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
    allContributor {
      nodes {
        logoCount
        ctrbID
        name
        avatar {
          childImageSharp {
            gatsbyImageData(width: 40, placeholder: BLURRED, formats: WEBP, layout: CONSTRAINED)
          }
        }
      }
    }
    allLogo(filter: { fields: { locale: { eq: $language } } }) {
      totalCount
    }
  }
`
