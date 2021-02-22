import React from 'react'
import Layout from '../components/layout'
import Header from '../components/header'
import Hero from '../components/hero'
import IndexLatest from '../components/index_latest'
import Footer from '../components/footer'

import indexStyles from '../styles/_partial/index.module.styl'

export default function Home() {
  return (
    <Layout>
      <Header />
      <Hero />
      <div className={indexStyles.indexContent}>
        <div className={indexStyles.contentContainer}>
          <div className="latestLogos">
            <h1>Latest uploads</h1>
            <IndexLatest />
          </div>
          {/* <div className="randomLogos">
            <h1>Random logos</h1>
          </div> */}
        </div>
      </div>
      <Footer />
    </Layout>
  )
}
