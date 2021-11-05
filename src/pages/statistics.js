import React from 'react'
import { graphql } from 'gatsby'
import { useIntl } from 'react-intl'

import Layout from '../components/layout'
import Seo from '../components/seo'
import Search from '../components/single-search'

import { mainContent, contentWrapper } from './statistics.module.styl'

const DataTable = ({ data }) => {
  const intl = useIntl()
  const keys = Object.keys(data[0])
  return (
    <table>
      <thead>
        <tr>
          {keys.map((key, index) => (
            <th key={index}>{intl.formatMessage({ id: key })}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {keys.map((key, index) => (
              <td key={index}>{row[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const Statistics = ({ data, pageContext }) => {
  const intl = useIntl()
  return (
    <Layout pageContext={pageContext}>
      <Seo title={intl.formatMessage({ id: 'statistics.title' })} />
      <Search locale={pageContext.locale} />
      <div className={mainContent}>
        <section className={contentWrapper}>
          <DataTable data={data.allStatistics.nodes} />
        </section>
      </div>
    </Layout>
  )
}

export default Statistics

export const query = graphql`
  query ($locale: String!) {
    allStatistics(filter: { fields: { locale: { eq: $locale } } }) {
      nodes {
        nation
        assns
        comps
        clubs
        logos
      }
    }
  }
`
