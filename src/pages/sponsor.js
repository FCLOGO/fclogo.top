import React from 'react'
import { useIntl } from 'react-intl'
import { StaticImage } from 'gatsby-plugin-image'
import { LocalizedLink } from 'gatsby-plugin-usei18n'

import Layout from '../components/layout'
import Seo from '../components/seo'
import PageHero from '../components/pageHero'

import AlipayIcon from '../../static/assets/icons/alipay.inline.svg'
import WechatpayIcon from '../../static/assets/icons/wechatpay.inline.svg'
import PaypalIcon from '../../static/assets/icons/paypal.inline.svg'
import ChatIcon from '../../static/assets/icons/chat.inline.svg'
import FclogoIcon from '../../static/assets/icons/fclogo.inline.svg'

import {
  mainContent,
  inner,
  separator,
  sponsorSubtitle,
  paymentWrapper,
  payment,
  paymentImage,
  paymentInfo,
  alipayIcon,
  wechatpayIcon,
  fclogoIcon,
  paypalIcon,
  contactButton
} from './sponsor.module.styl'

const SponsorPage = ({ pageContext }) => {
  const intl = useIntl()
  return (
    <Layout pageContext={pageContext}>
      <Seo title={intl.formatMessage({ id: 'sponsor.title' })} />
      <PageHero pageSlogan={intl.formatMessage({ id: 'sponsor.slogan' }, { br: <br /> })} />
      <div className={mainContent}>
        <section>
          <div className={inner}>
            <h2>{intl.formatMessage({ id: 'sponsor.title' })}</h2>
            <span className={separator}></span>
            <p className={sponsorSubtitle}>{intl.formatMessage({ id: 'sponsor.subtitle' })}</p>
            <div className={paymentWrapper}>
              <div className={payment}>
                <StaticImage
                  className={paymentImage}
                  src="../../static/assets/images/alipay.png"
                  alt="AliPay"
                  placeholder="blurred"
                  layout="fullWidth"
                />
                <div className={paymentInfo}>
                  <AlipayIcon className={alipayIcon} />
                  <h3>{intl.formatMessage({ id: 'sponsor.alipay' })}</h3>
                  <span className={separator}></span>
                  <p>{intl.formatMessage({ id: 'sponsor.alipayDes' })}</p>
                </div>
              </div>
              <div className={payment}>
                <StaticImage
                  className={paymentImage}
                  src="../../static/assets/images/wechat-pay.png"
                  alt="Wechat Pay"
                  placeholder="blurred"
                  layout="fullWidth"
                />
                <div className={paymentInfo}>
                  <WechatpayIcon className={wechatpayIcon} />
                  <h3>{intl.formatMessage({ id: 'sponsor.wechatpay' })}</h3>
                  <span className={separator}></span>
                  <p>{intl.formatMessage({ id: 'sponsor.wechatpayDes' })}</p>
                </div>
              </div>
              <a href="https://paypal.me/iiiryan" className={payment} target="_blank">
                <FclogoIcon className={fclogoIcon} />
                <div className={paymentInfo}>
                  <PaypalIcon className={paypalIcon} />
                  <h3>{intl.formatMessage({ id: 'sponsor.paypal' })}</h3>
                  <span className={separator}></span>
                  <p>{intl.formatMessage({ id: 'sponsor.paypalDes' })}</p>
                </div>
              </a>
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

export default SponsorPage
