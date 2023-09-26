import React from 'react'
import { graphql } from 'gatsby'
import { useTranslation } from 'gatsby-plugin-react-i18next'

import Layout from '../components/layout'
import Seo from '../components/seo'
import Search from '../components/_algolia'

const DataTable = ({ data }) => {
  const { t } = useTranslation()
  const keys = Object.keys(data[0])
  return (
    <table className="text-[13px] w-full border-collapse mb-2xl">
      <thead>
        <tr className="border-b border-b-light-gray">
          {keys.map((key, index) => (
            <th key={index} className="text-center uppercase p-sm">
              {t(key)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr
            key={index}
            className="text-center border-b border-b-gray-1 last:border-b-light-gray hover:bg-white"
          >
            {keys.map((key, index) => (
              <td key={index} className="p-sm">
                {row[key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const Statistics = ({ data, pageContext }) => {
  return (
    <Layout>
      <div className="fixed top-header w-full bg-gray px-xl py-lg text-center border-b border-gray-1 z-30">
        <Search locale={pageContext.language} />
      </div>
      <div className="w-full m-[0_auto] flex-grow pt-[180px] flex flex-row items-start">
        <section className="w-full px-xl flex flex-col mx-auto mb-[100px]">
          <DataTable data={data.allStatistics.nodes} />
        </section>
      </div>
    </Layout>
  )
}

export default Statistics

export const Head = ({ data }) => {
  const locales = data.locales.edges[0].node.data
  let obj = undefined
  if (locales) {
    obj = JSON.parse(locales)
  }
  return <Seo title={obj?.statisticstitle} />
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
    allStatistics(filter: { fields: { locale: { eq: $language } } }) {
      nodes {
        continent
        nation
        association
        comps
        clubs
        logos
      }
    }
  }
`
