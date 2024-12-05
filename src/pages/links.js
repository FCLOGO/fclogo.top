import React from 'react'
import { Link, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useTranslation } from 'gatsby-plugin-react-i18next'

import Layout from '../components/layout'
import Seo from '../components/seo'

import LinkIcon from '../../static/assets/icons/link.inline.svg'
import MailIcon from '../../static/assets/icons/mail.inline.svg'
import DiscordIcon from '../../static/assets/icons/discord.inline.svg'

const ContactLinks = [
  {
    title: 'Mail',
    link: 'mailto:info@fclogo.top',
    icon: <MailIcon className="w-full h-full fill-light-gray hover:fill-dark-gray" />
  },
  {
    title: 'Discord',
    link: 'https://discord.gg/gVcbysaEWD',
    icon: <DiscordIcon className="w-full h-full fill-light-gray hover:fill-dark-gray" />
  }
]

const Links = ({ data }) => {
  const { t } = useTranslation()
  return (
    <Layout>
      <div className="w-full mx-auto mt-xl mb-[100px] pt-[120px] px-[40px] max-w-[1400px] flex-auto flex flex-col flex-nowrap flex-grow items-start">
        <section className="flex-auto flex flex-col flex-nowrap mb-[40px] w-full">
          <div className="w-full overflow-hidden grid justify-between gap-3xl grid-cols-[repeat(auto-fill,_minmax(400px,_1fr))]">
            {data.allLink.nodes.map(link => (
              <article
                key={link.id}
                className="bg-white rounded-lg border border-gray-1 hover:border-gray-2 shadow-card"
              >
                <Link
                  to={link.url}
                  className="w-full p-xl relative overflow-hidden text-dark-gray flex flex-row flex-nowrap items-center justify-between"
                  target="_blank"
                >
                  <GatsbyImage
                    image={getImage(link.logoPath)}
                    alt={link.title}
                    className="mr-lg rounded-[50%] flex-shrink-0"
                  />
                  <div className="flex-grow overflow-hidden">
                    <h3 className="font-semibold text-sm mb-sm whitespace-nowrap overflow-hidden text-ellipsis">
                      {link.title}
                    </h3>
                    <p className="text-xs whitespace-nowrap overflow-hidden text-ellipsis">
                      {link.description}
                    </p>
                  </div>
                  <LinkIcon className="w-xl h-xl ml-md fill-light-gray flex-shrink-0" />
                </Link>
              </article>
            ))}
          </div>
        </section>
        <section className="w-full flex flex-col items-center">
          <h2 className="text-2xl uppercase font-semibold tracking-wider mb-md indent-md">
            {t('exchangelinks')}
          </h2>
          <p className="uppercase font-medium mb-sm">{t('contactus')}</p>
          <ul className="flex flex-row flex-nowrap justify-center items-center">
            {ContactLinks.map((item, index) => (
              <li className="w-[44px] h-[44px] p-[10px]">
                <a key={index} href={item.link} rel="noopener noreferrer" target="_blank">
                  {item.icon}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  )
}

export default Links

export const Head = ({ data }) => {
  const locales = data.locales.edges[0].node.data
  let obj = undefined
  if (locales) {
    obj = JSON.parse(locales)
  }
  return <Seo title={obj?.linkstitle} />
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
    allLink {
      nodes {
        id
        title
        url
        logoPath {
          childImageSharp {
            gatsbyImageData(width: 64, placeholder: BLURRED, formats: WEBP, layout: CONSTRAINED)
          }
        }
        description
      }
    }
  }
`
