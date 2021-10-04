import React from 'react'
import { useIntl } from 'react-intl'

import Layout from '../components/layout'
import Seo from '../components/seo'
import PageHero from '../components/page-hero'

import DiscussionsIcon from '../../static/assets/icons/github.inline.svg'
import TwitterIcon from '../../static/assets/icons/twitter.inline.svg'
import WeiboIcon from '../../static/assets/icons/weibo.inline.svg'
import DiscordIcon from '../../static/assets/icons/discord.inline.svg'

import {
  mainContent,
  inner,
  separator,
  contactSubtitle,
  linkWrapper,
  link,
  linkTitle,
  linkDescription
} from './contact.module.styl'

const ContactPage = ({ pageContext }) => {
  const intl = useIntl()
  const contackLinks = [
    {
      name: intl.formatMessage({ id: 'contact.discussions' }),
      url: 'https://github.com/FCLOGO/fclogo.top/discussions',
      icon: <DiscussionsIcon />,
      description: intl.formatMessage({ id: 'contact.discussionsDes' })
    },
    {
      name: intl.formatMessage({ id: 'contact.discord' }),
      url: 'https://discord.gg/gVcbysaEWD',
      icon: <DiscordIcon />,
      description: intl.formatMessage({ id: 'contact.discordDes' })
    },
    {
      name: intl.formatMessage({ id: 'contact.weibo' }),
      url: 'https://weibo.com/7578670869',
      icon: <WeiboIcon />,
      description: intl.formatMessage({ id: 'contact.weiboDes' })
    },
    {
      name: intl.formatMessage({ id: 'contact.twitter' }),
      url: 'https://twitter.com/fclogotop',
      icon: <TwitterIcon />,
      description: intl.formatMessage({ id: 'contact.twitterDes' })
    }
  ]
  return (
    <Layout pageContext={pageContext}>
      <Seo title={intl.formatMessage({ id: 'contact.title' })} />
      <PageHero pageSlogan={intl.formatMessage({ id: 'contact.slogan' }, { br: <br /> })} />
      <div className={mainContent}>
        <section>
          <div className={inner}>
            <h2>{intl.formatMessage({ id: 'contact.title' })}</h2>
            <span className={separator}></span>
            <p className={contactSubtitle}>{intl.formatMessage({ id: 'contact.subtitle' })}</p>
            <div className={linkWrapper}>
              {contackLinks.map(clink => (
                <a href={clink.url} className={link} key={clink.name} target="_blank">
                  {clink.icon}
                  <h3 className={linkTitle}>{clink.name}</h3>
                  <span className={separator}></span>
                  <p className={linkDescription}>{clink.description}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default ContactPage
