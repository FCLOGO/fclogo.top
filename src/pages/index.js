import React from 'react'
import Layout from '../components/layout'
import Header from '../components/header'
import Hero from '../components/hero'

export default function Home() {
  return (
    <Layout>
      <Header />
      <Hero />
      <div id="index-content-wrap" className="index-content-wrap">
        <p>This is index content</p>
      </div>
      <footer id="footer" className="wrapper">
        <div id="footer-inner" className="inner">
          <p>This is footer</p>
        </div>
      </footer>
    </Layout>
  )
}
