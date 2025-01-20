require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

// node 监听数量
require('events').EventEmitter.defaultMaxListeners = 50

/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `FCLOGO`,
    description: `Collection of football club vector logos. All logos work with SVG and PNG. No account and unlimited downloads for free.`,
    keywords: `football,football club,logo,vector,vector logo,football logo,football badge,AI,SVG`,
    author: `@fclogo`,
    siteUrl: `https://fclogo.top`
  },
  plugins: [
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `FCLOGO`,
        short_name: `FCLOGO`,
        start_url: `/`,
        background_color: `#2D2CDD`,
        theme_color: `#2D2CDD`,
        display: `standalone`,
        icon: `static/assets/images/icon.png`
      }
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`, `avif`]
        },
        failOn: `warning`
      }
    },
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/'
      },
      __key: 'pages'
    },
    {
      resolve: `gatsby-plugin-modal-routing-v5.0`,
      options: {
        appElement: '#___gatsby',
        modalProps: {
          portalClassName: 'modal_portal',
          overlayClassName: 'modal_overlay',
          className: 'modal_content',
          shouldCloseOnOverlayClick: false
        }
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/locales`,
        name: `locale`
      }
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`,
        languages: [`en`, `zh-cn`],
        defaultLanguage: `en`,
        siteUrl: `https://fclogo.top`,
        trailingSlash: 'always',
        redirect: true,
        i18nextOptions: {
          interpolation: {
            escapeValue: false // not needed for react as it escapes by default
          },
          lowerCaseLng: true,
          keySeparator: false,
          nsSeparator: false
        }
      }
    },
    {
      resolve: `gatsby-transformer-yaml`,
      options: {
        typeName: ({ node, object, isArray }) => object.data
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/`,
        name: `mainData`
      }
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.GATSBY_ALGOLIA_API_KEY,
        indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
        queries: require('./src/components/_algolia/algolia-queries'),
        dryRun: false
      }
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.inline\.svg$/
        }
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `support`,
        path: `${__dirname}/src/support/`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        footnotes: true,
        gfm: true,
        plugins: [
          `gatsby-remark-autolink-headers`,
          `remark-admonition`,
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false
            }
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              linkImagesToOriginal: false,
              quality: 100,
              showCaptions: true,
              withWebp: true,
              loading: 'lazy',
              backgroundColor: 'transparent'
            }
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-firebase-v9.0`,
      options: {
        credentials: {
          apiKey: process.env.GATSBY_FIREBASE_API_KEY,
          authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
          databaseURL: process.env.GATSBY_FIREBASE_DATABASE_URL,
          projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
          storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.GATSBY_FIREBASE_APP_ID,
          measurementId: process.env.GATSBY_FIREBASE_MEASUREMENT_ID
        }
      }
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ['G-FLQ3DMRD17'],
        pluginConfig: {
          head: true,
          respectDNT: true,
          exclude: ['/preview/**', '/do-not-track/me/too/']
        }
      }
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        createLinkInHead: true,
        excludes: [
          `/dev-404-page`,
          `/zh-cn/dev-404-page`,
          `/404`,
          `/zh-cn/404`,
          `/404.html`,
          `/zh-cn/404.html`,
          `/offline-plugin-app-shell-fallback`,
          `/zh-cn/offline-plugin-app-shell-fallback`
        ],
        entryLimit: 5000
      }
    }
  ]
}
