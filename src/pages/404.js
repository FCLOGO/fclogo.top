import * as React from 'react'
import { graphql } from 'gatsby'
import { Link, useTranslation } from 'gatsby-plugin-react-i18next'

import Layout from '../components/layout'
import Seo from '../components/seo'
import Search from '../components/_algolia'

import ArrowIcon from '../../static/assets/icons/arrowForward.inline.svg'

const NotFoundPage = ({ pageContext }) => {
  const { t } = useTranslation()
  return (
    <Layout>
      <Seo title={t('home.notFound')} />
      <div className="fixed top-header w-full bg-gray px-xl py-lg text-center border-b border-gray-1 z-30">
        <Search locale={pageContext.language} />
      </div>
      <div className="w-full m-[0_auto] flex-grow pt-[200px] px-xl pb-header flex flex-col items-center justify-center">
        <h1 className="font-thin text-[200px] leading-none text-green">404</h1>
        <h2 className="font-medium text-2xl">{t('home.ooops')}</h2>
        <p className="font-medium text-lg uppercase">{t('home.notFoundText')}</p>
        <Link
          to="/"
          className="mt-header bg-green hover:bg-light-green rounded cursor-pointer text-lg leading-none uppercase font-medium w-[200px] h-[50px] flex flex-row items-center justify-between text-white"
        >
          <ArrowIcon className="h-[50px] w-[50px] rotate-180 p-md bg-light-green rounded-r border-l  border-l-white border-opacity-20 stroke-white flex-none" />
          <span className="flex-grow text-center">{t('home.backHome')}</span>
        </Link>
      </div>
    </Layout>
  )
}

export default NotFoundPage

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
  }
`
